# Task 2 — n8n API Integration Workflow: Daily AI & Automation Morning Brief

**Candidate:** Sandhit Karmakar (`sandhitkarmakar@gmail.com`)  
**Workflow File:** `Task2_Workflow_Sandhit_Karmakar.json`  
**Bonus Workflow File:** `Bonus_UptimeMonitor_Sandhit_Karmakar.json`

## 1. Which APIs Were Used & Why

1. **Primary Data Source (First HTTP Request) — [GitHub REST Search API](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories) (`GET https://api.github.com/search/repositories`):**
   - **Why chosen:** For an engineering and QA automation team, tracking newly active open-source repositories tagged with `topic:automation` and `topic:ai` provides high-signal discovery of emerging testing frameworks, MCP servers, and workflow tools. It is free, well-documented, supports header token authentication (`httpHeaderAuth`), and returns rich structured metrics (`stargazers_count`, `forks_count`, `open_issues_count`, `language`, `pushed_at`).
2. **Enrichment Endpoint #1 (Second HTTP Request) — [GitHub Repository README API](https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-a-repository-readme) (`GET https://api.github.com/repos/{owner}/{repo}/readme`):**
   - **Why chosen:** Repository search results only include a short one-line description. Fetching the repository's `README.md` payload and decoding its Base64 body extracts a clean 260-character architectural summary for the morning digest.
3. **Enrichment Endpoint #2 (Cross-API Signal) — [HackerNews Algolia Search API](https://hn.algolia.com/api) (`GET https://hn.algolia.com/api/v1/search`):**
   - **Why chosen:** Combining GitHub star metrics with live [HackerNews community discussions](https://news.ycombinator.com) (`hn_points`, `hn_comments`, and direct discussion thread URLs) separates genuine engineering adoption from artificial star spikes.

## 2. What the Transformation Does (`2. Filter, Sort & Keep Top 5 (Code)` & `4. Merge Enriched Digest Payload`)

- **Filtering & Hygiene:** Strips out archived (`repo.archived === true`), disabled, or undocumented (`!repo.description`) repositories from the initial 15 GitHub search results.
- **Composite Velocity Scoring:** Computes a weighted traction metric:
  $$\text{velocity\_score} = \text{stars} + (2 \times \text{forks}) + \min(\text{open\_issues}, 200)$$
  Forks are weighted $2\times$ because developers fork repositories when actively testing or deploying them, whereas open issues are capped at 200 so buggy repos do not artificially outrank healthy ones.
- **Top 5 Ranking & Base64 Sanitization:** Sorts descending by `velocity_score`, slices the **Top 5** items, decodes the Base64 README payload (stripping Markdown badge clutter and raw HTML tags), and attaches HackerNews discussion totals.
- **Conditional Routing (`5. IF Stars > 1000`):**
  - **True Branch (`stars > 1000` — Breakout Tier):** Posts a formatted digest directly to the team Slack channel (`#eng-morning-brief`) via n8n's Slack node and returns a `200 OK` JSON summary to webhook callers.
  - **False Branch (`stars <= 1000` — Emerging Watchlist):** Appends the repository row to a Google Sheets watchlist (`Emerging_Repos_Under_1000_Stars`) so early-stage projects are tracked without spamming primary Slack alert channels.

## 3. How the Error Path & Credentials Behave

- **Zero Hard-Coded Secrets:** All tokens and OAuth secrets are referenced strictly via n8n's **Credentials Store** (`GitHub REST API Token (Header Auth)`, `Slack Morning Brief Bot Token`, and `Google Sheets Service OAuth2`) plus `$env` variables (`$env.SLACK_MORNING_BRIEF_CHANNEL`, `$env.SLACK_ALERTS_CHANNEL`).
- **Two-Layer Non-Silent Failure Handling:**
  1. **Node-Level `Continue On Fail` + Retries:** Both HTTP Request nodes enable `retryOnFail: true` (`maxTries: 3`, `waitBetweenTries: 2000ms`) and `onError: "continueErrorOutput"`, routing HTTP `403`/`429` rate limits or `5xx` timeouts to `8. Format Error & Fallback Log (Code)`.
  2. **Workflow-Level `Global Error Trigger`:** Catches any unexpected runtime exception (e.g., empty upstream array or malformed JSON) and dispatches a structured P2 alert to `#qa-automation-alerts` via `9. Send Failure Alert to Slack` so the workflow never fails silently.

## 4. Quick Webhook Test (`curl`)

```bash
curl -X POST http://localhost:5678/webhook/morning-brief \
  -H "Content-Type: application/json" \
  -d '{"query": "topic:automation+topic:ai+pushed:>2026-10-01"}'
```
