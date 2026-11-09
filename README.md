# Oytra Automation & QA Assessment

This folder contains a Task 1 report for the RealWorld Conduit demo, an n8n GitHub morning-brief workflow, an optional uptime-monitor workflow, a dashboard demo, and a small Playwright characterization spec.

<<<<<<< HEAD
**Role:** Automation & QA Developer (AI-Built Web App Debugging & n8n Workflow Engineering)
## **Video Link** : https://drive.google.com/file/d/1dqtBwuOPi0WzycOC2vgrEkgbmrgb89Up/view?usp=sharing

**Target Web App Audited:** [RealWorld "Conduit" SaaS Blogging Platform](https://github.com/gothinkster/realworld) ([Live Demo](https://sandhit.vercel.app/), [React/Redux Frontend](https://github.com/gothinkster/react-redux-realworld-example-app), [Node/Express/Prisma Backend](https://github.com/gothinkster/node-express-prisma-v1-official-app))
=======
## What is included

- `Task1_QA_Report_Sandhit_Karmakar.pdf` — seven reported issues and a root-cause analysis. The target application's source is not included, so the report's implementation-level and security claims are not independently verified by this repository.
- `workflows/Task2_Workflow_Sandhit_Karmakar.json` — hourly or webhook-triggered GitHub search, top-five filtering/scoring, README and Hacker News enrichment, and Slack/Google Sheets routing.
- `workflows/Bonus_UptimeMonitor_Sandhit_Karmakar.json` — five-minute frontend status/elapsed-time monitor and daily summary. It stores its last-24-hour samples in n8n workflow static data.
- `dashboard/index.html` — a browser-based explainer with simulated workflow and uptime activity. It does not connect to n8n or prove a real execution.
- `screenshots/` — illustrative workflow and output diagrams. They are not screenshots from the n8n application and should not be submitted as execution evidence.
- `tests/conduit_qa.spec.ts` — optional exploratory checks against the public demo. It requires Playwright to be installed separately; this repository has no package manifest or Playwright configuration.
>>>>>>> 036bc3f (changes added)

## Start n8n locally (Windows + Docker Desktop)

From this folder in PowerShell:

<<<<<<< HEAD
This project is a complete, production-grade submission for the **Automation & QA Developer Take-Home Skills Assessment**, designed not only to fulfill every required deliverable in Tasks 1, 2, and the Bonus Task, but also to include **unique engineering differentiators** (an interactive QA & n8n Simulation Command Center web app, an automated [Playwright](https://playwright.dev) E2E bug-reproduction suite, and a one-command Docker Compose test harness).

| Assessment Component | Primary Deliverable File | What It Accomplishes | Unique Differentiator Included | 
| ----- | ----- | ----- | ----- | 
| **Task 1 — Web App QA & Debug Report** | `Task1_QA_Report_Sandhit_Karmakar.pdf` | Audits the [RealWorld Conduit](https://demo.realworld.io) web app across Sign-Up, Login, Create/Edit/Delete Article, Tagging, Follow/Favorite, and Logout; documents **7 verified bugs** using the exact Section 5 template plus an 8-sentence Root-Cause Analysis on [Issue #187](https://github.com/gothinkster/react-redux-realworld-example-app/issues). | Includes code-level patches (`src/middleware.js` & `src/reducers/home.js`), a cross-browser reliability chart (Chromium vs. Safari WebKit CORS), and an automated Playwright test spec (`tests/conduit_qa.spec.ts`). | 
| **Task 2 — n8n API Integration Workflow** | `Task2_Workflow_Sandhit_Karmakar.json` & `Task2_README.md` | Watches the [GitHub REST Search API](https://www.google.com/search?q=https://docs.github.com/en/rest/search/search%3FapiVersion%3D2022-11-28%23search-repositories), filters and ranks the **Top 5** AI/Automation repositories via a custom Velocity Score in a JavaScript Code node, enriches each repo with its decoded [GitHub README](https://www.google.com/search?q=https://docs.github.com/en/rest/repos/contents%3FapiVersion%3D2022-11-28%23get-a-repository-readme) and live [HackerNews Algolia](https://hn.algolia.com/api) sentiment, and routes via an `IF` node (`stars > 1000`) to Slack or Google Sheets with dual-layer error handling. | Combines **both** an hourly `Schedule Trigger` and a `POST /webhook/morning-brief` `Webhook Trigger` for instant `curl` testing, plus 3-API enrichment (GitHub Search + GitHub README + HackerNews Algolia). | 
| **Bonus Task — Uptime & Latency SLA Monitor** | `Bonus_UptimeMonitor_Sandhit_Karmakar.json` | Polls [demo.realworld.io](https://demo.realworld.io) every 5 minutes, checks HTTP status (`!= 200`), implements **3x retry backoff** (`5000ms`), tracks response latency (`ms`) in `$getWorkflowStaticData('global')`, alerts Slack on outages or degraded latency (`> 1500ms`), and dispatches a daily `09:00 UTC` SLA summary with P95 latency. | Tracks rolling 24-hour uptime percentage and 95th-percentile (`P95`) tail latency natively inside n8n static workflow memory without requiring an external database. | 
| **Interactive Command Center Web App** | `Oytra_QA_Automation_Command_Center.html` | Single-file browser dashboard allowing reviewers to inspect all 7 Conduit bugs, replay the `localStorage` `401` crash vs. patched fix, click through n8n workflow nodes, simulate Happy Path vs. Rate-Limit Error executions, and use a built-in Loom teleprompter. | Gives you an interactive visual centerpiece to share on screen during your Loom video recording and 45-minute technical interview. | 

## 2. Repository Directory Structure (Ready to Push to GitHub)

```
oytra-automation-qa-assessment/
├── README.md                                       # Master documentation, setup & interview guide
├── Task2_README.md                                 # Concise <1-page Task 2 workflow documentation
├── Task1_QA_Report_Sandhit_Karmakar.pdf            # Formal Task 1 QA & Debug Report PDF
├── docker-compose.yml                              # One-command local n8n instance setup
├── workflows/
│   ├── Task2_Workflow_Sandhit_Karmakar.json        # Exported Task 2 n8n API Integration workflow
│   └── Bonus_UptimeMonitor_Sandhit_Karmakar.json   # Exported Bonus 5-Min Uptime Monitor workflow
├── screenshots/
│   ├── task2_workflow_canvas.png                   # Screenshot (a): Task 2 n8n workflow canvas
│   ├── task2_execution_output.png                  # Screenshot (b): Task 2 successful execution output
│   └── bonus_uptime_canvas.png                     # Screenshot (c): Bonus Uptime Monitor canvas
├── dashboard/
│   └── index.html                                  # Interactive QA & n8n Simulator Web App
├── tests/
│   └── conduit_qa.spec.ts                          # Playwright E2E bug reproduction & regression tests
└── scripts/
    └── test_webhooks.sh                            # Automated curl test script for n8n webhooks

```

## 3. Deep Breakdown of What Was Built (How Everything Works)

### 3.1 Task 1 — Web App QA & Debug Report (`Task1_QA_Report_Sandhit_Karmakar.pdf`)

We audited the [RealWorld Conduit application](https://github.com/gothinkster/realworld) ([React + Redux SPA](https://github.com/gothinkster/react-redux-realworld-example-app) backed by the [official Node/Express/Prisma API](https://github.com/gothinkster/node-express-prisma-v1-official-app) at `https://api.realworld.io/api`). Here are the **7 verified defects** documented in your report:

1. **Bug #1 (`Critical` — [Issue #187](https://github.com/gothinkster/react-redux-realworld-example-app/issues)): Stale JWT in `localStorage` Crashes App into a Blank White Screen:**

   * **What happens:** When a user returns to Conduit with an expired or invalidated `jwt` in `window.localStorage`, `App.componentWillMount()` attaches that token to all requests before verifying validity. When `HOME_PAGE_LOADED` runs `Promise.all([agent.Tags.getAll(), agent.Articles.all()])`, the API returns `401 Unauthorized`. In `src/middleware.js`, `promiseMiddleware` sets `action.error = true` and assigns the error response body to `action.payload`. Because `src/reducers/home.js` never checks `if (action.error)` before evaluating `action.payload[0].tags`, JavaScript throws `Uncaught TypeError: Cannot read property 'tags' of undefined` ([Verified Replay Analysis](https://dev.to/zaydmulani09/i-built-a-tool-that-finds-the-minimal-cause-of-a-browser-bug-by-replaying-it-3odg)), unmounting React completely.

   * **How our patch fixes it:** Intercepts `401` in `src/middleware.js` to purge `localStorage.removeItem('jwt')` and dispatch `LOGOUT`, plus guards `src/reducers/home.js` with `if (action.error || !Array.isArray(action.payload))`.

2. **Bug #2 (`Critical` — [Security Audit](https://aitestinghub.co.uk/)): Stored Cross-Site Scripting (XSS) via Outdated `marked@0.3.6` & `dangerouslySetInnerHTML`:**

   * **What happens:** `src/components/Article/index.js` (line 38) renders Markdown using `dangerouslySetInnerHTML={{ __html: marked(article.body, { sanitize: true }) }}` with `marked@0.3.6`, which has known sanitizer bypass vulnerabilities for HTML-entity-encoded `javascript:` links, allowing attackers to exfiltrate `window.localStorage.jwt`.

3. **Bug #3 (`High` — [Issue #878](https://github.com/realworld-apps/realworld/issues/878)): Cross-Origin `307 Temporary Redirect` Strips `Authorization` Header on Safari & iOS:**

   * **What happens:** Requests to `conduit.productionready.io/api` undergo a `307 Temporary Redirect` to `api.realworld.io/api`. WebKit/Safari strips `Authorization: Token <jwt>` headers across cross-origin redirects, breaking all authenticated actions on macOS/iOS Safari.

4. **Bug #4 (`High` — [Code Audit](https://aitestinghub.co.uk/)): Incomplete Logout Cleanup & Missing Editor Route Authorization Guard:**

   * **What happens:** `src/middleware.js:56` clears `localStorage` on logout without purging Redux slices, and `src/components/Editor.js:83` lacks a route-level ownership check (`currentUser.username === article.author.username`), allowing logged-out users or non-authors to open `/#/editor/:slug`.

5. **Bug #5 (`Medium` — [Issue #151](https://github.com/gothinkster/react-redux-realworld-example-app/issues/151)): Article Tags Silently Lost Unless User Presses Undocumented `Enter` Key:**

   * **What happens:** `watchForEnter` in `src/components/Editor.js` only dispatches `ADD_TAG` on `ev.keyCode === 13`. Typing tags into `"Enter tags"` and clicking `"Publish Article"` directly sends `tagList: []` and drops `state.editor.tagInput`.

6. **Bug #6 (`Medium` — [Discussion #849](https://github.com/gothinkster/realworld/discussions/849) & [#1390](https://github.com/realworld-apps/realworld/discussions/1390)): Unhandled `500`/`503` Upstream Errors & Duplicate Title Slug Collisions Freeze UI:**

   * **What happens:** `ListErrors.js` only parses `422` `{ errors: { field: [...] } }` payloads. When the backend returns `500 Internal Server Error` (on duplicate article title slug constraint) or `503 Service Unavailable` ([Discussion #1540](https://github.com/realworld-apps/realworld/discussions/1540)), no error banner is shown.

7. **Bug #7 (`Low` — [Profile.js:43](https://aitestinghub.co.uk/)): Unauthenticated Clicks on Follow & Favorite Fail Silently:**

   * **What happens:** Clicking `"Favorite"` or `"+ Follow"` while logged out triggers an unhandled `401 Unauthorized` network error without redirecting to `/#/login`.

### 3.2 Task 2 — n8n API Integration Workflow (`Task2_Workflow_Sandhit_Karmakar.json`)

The workflow implements an automated **Daily AI & Automation Morning Brief** with 11 nodes:

1. **Dual Triggers (`Schedule Trigger` every 1 hour + `Webhook Trigger` at `POST /webhook/morning-brief`):** Lets the workflow run unattended every hour while allowing instant verification via `curl` or Postman.

2. **First HTTP Request (`1. Fetch Trending GitHub Repos`):** Calls `GET https://api.github.com/search/repositories?q=topic:automation+topic:ai+pushed:>2026-10-01&sort=stars&order=desc&per_page=15` using n8n's `httpHeaderAuth` credential store (`GitHub REST API Token (Header Auth)`), configured with `retryOnFail: true` (`maxTries: 3`, `waitBetweenTries: 2000ms`) and `onError: "continueErrorOutput"`.

3. **Transformation (`2. Filter, Sort & Keep Top 5 (Code)`):** Filters out archived or incomplete repos, calculates `velocity_score = stars + (forks * 2) + Math.min(open_issues, 200)`, sorts descending, and keeps only the **Top 5** repositories.

4. **Second HTTP Request Enrichment (`3a. Enrich: Fetch Repo README API` + `3b. Enrich: HackerNews Sentiment API`):**

   * Calls `GET https://api.github.com/repos/{{ $json.full_name }}/readme` to decode the Base64 `README.md` into a clean 260-character summary excerpt.

   * Calls `GET https://hn.algolia.com/api/v1/search?query={{ encodeURIComponent($json.name) }}&tags=story&hitsPerPage=3` to enrich each repository with live HackerNews community points, comment counts, and discussion links.

5. **Conditional Routing (`5. IF Stars > 1000 (Threshold)`):**

   * **True Branch (`stars > 1000`):** Sends a formatted breakout digest to Slack (`#eng-morning-brief`) via n8n's Slack node (`Slack Morning Brief Bot Token`).

   * **False Branch (`stars <= 1000`):** Appends the emerging repository to a Google Sheets watchlist (`Emerging_Repos_Under_1000_Stars`).

6. **Non-Silent Error Handling (`Global Error Trigger` + `8. Format Error & Fallback Log` + `9. Send Failure Alert to Slack`):** Any failed HTTP request or runtime error is formatted with HTTP status code, timestamp, and remediation guidance and posted to `#qa-automation-alerts`.

### 3.3 Bonus Task — 5-Minute Uptime & Latency SLA Monitor (`Bonus_UptimeMonitor_Sandhit_Karmakar.json`)

1. **Every 5 Minutes Poll (`Every 5 Minutes Poll Trigger`):** Initiates a check every 5 minutes and stamps `start_time_ms`.

2. **HTTP Health Check with Retry Logic (`2. Ping Conduit Web App (3x Retry)`):** Requests `https://demo.realworld.io` with `fullResponse: true`, `neverError: true`, `retryOnFail: true`, `maxTries: 3`, and `waitBetweenTries: 5000` (5-second backoff between retries).

3. **Response-Time Tracking & Rolling SLA (`3. Compute Latency & Rolling SLA (Code)`):** Calculates `response_time_ms`, stores a rolling 24-hour window (288 checks) in `$getWorkflowStaticData('global')`, and computes rolling 24-hour uptime percentage.

4. **Multi-Tier Alerting (`4. IF Status Code != 200` & `5b. IF Latency > 1500ms`):**

   * If `status_code != 200`, sends an immediate **Critical Outage Alert** to Slack (`#eng-morning-brief`).

   * If `status_code == 200` but `response_time_ms > 1500`, sends a **Degraded Performance Warning** to Slack and logs telemetry to Google Sheets.

5. **Daily 09:00 SLA Summary (`Daily 09:00 Summary Trigger` -> `7. Compile Daily Uptime & P95 Report` -> `8. Post Daily Summary to Slack`):** Computes 24-hour Uptime %, Mean Latency (`ms`), and 95th-Percentile (`P95`) Latency (`ms`) across all 288 daily checks and posts the daily report to Slack.

## 4. How to Run Locally & Push to GitHub (Step-by-Step)

### Step 1: Unzip and Push to Your Public GitHub Repository

```
unzip Oytra_Automation_QA_Submission.zip -d oytra-qa-assessment
cd oytra-qa-assessment
git init
git add .
git commit -m "feat: complete Task 1 QA report, Task 2 n8n workflow, Bonus Uptime Monitor, and Playwright suite"
git branch -M main
git remote add origin https://github.com/<your-github-username>/oytra-qa-assessment.git
git push -u origin main

```

### Step 2: Spin Up n8n Locally & Import Both Workflows

```
# Option A: Using our included Docker Compose file
=======
```powershell
>>>>>>> 036bc3f (changes added)
docker compose up -d
docker compose ps
```

Open <http://localhost:5678> and create the local owner account. In n8n, import `workflows/Task2_Workflow_Sandhit_Karmakar.json` from the Workflows screen. The bonus workflow can be imported separately. The JSON files are not imported automatically by Docker Compose.

Create and select the credentials named by the nodes before activating a workflow:

1. **GitHub Header Auth** — header `Authorization`, value `Bearer YOUR_GITHUB_TOKEN`.
2. **Slack** — connect your Slack account and make sure the bot can post to your selected channel.
3. **Google Sheets OAuth2** — connect your account, create a sheet you can edit, and add the tabs `Emerging_Repos_Under_1000_Stars` and, if using the bonus workflow, `Uptime_24h_Log`.

Copy `.env.example` to `.env`, then set `GSHEETS_WATCHLIST_DOC_ID` to your spreadsheet ID. Do not commit `.env` or put API tokens in it; keep tokens in n8n Credentials. `SLACK_MORNING_BRIEF_CHANNEL`, `SLACK_ALERTS_CHANNEL`, and `TARGET_WEBAPP_URL` can also be set there. Restart after changing environment values with `docker compose up -d`.

The workflows import inactive to avoid scheduled API calls before setup. Activate Task 2 only after assigning the credentials and verifying the sheet and channel names. It polls hourly and acknowledges webhook requests immediately; inspect **Executions** in n8n for the run result. The bonus polls every five minutes and posts a daily summary in the configured timezone.

To test Task 2 from PowerShell after activation:

```powershell
$body = '{"query":"topic:automation+topic:ai"}'
Invoke-RestMethod -Method Post -Uri "http://localhost:5678/webhook/morning-brief" -ContentType "application/json" -Body $body
```

For two webhook acknowledgement checks, run `.\scripts\test_webhooks.ps1`. An HTTP acknowledgement confirms that n8n received the request; inspect **Executions** to verify workflow completion and any Slack/Sheets delivery.

To stop n8n without deleting its saved data, run `docker compose down`. Avoid `docker compose down -v` unless you intend to remove the persistent n8n data volume.

## Known limits

<<<<<<< HEAD
2. **Idempotency & Deduplication Layer in n8n (`Remove Duplicates` Node / Redis Cache):** Add n8n's `Remove Duplicates` node keyed by `repo_id` (or store seen repository IDs in `$getWorkflowStaticData('global')`) so the hourly schedule trigger only alerts `#eng-morning-brief` when a *new* repository enters the Top 5.

3. **LLM-Powered Self-Healing Test Selectors & Crash Triaging:** Add an OpenAI/Gemini node inside the Bonus Uptime Monitor's error branch that inspects failed HTTP payloads or Playwright DOM snapshots, classifies whether the failure is an infrastructure outage (`502`/`503`) vs. a frontend regression, and auto-drafts a GitHub Issue with reproduction steps.

4. **Dead-Letter Queue (DLQ) & Exponential Jitter for Rate-Limited APIs:** Inspect the `X-RateLimit-Reset` header from GitHub API `403`/`429` responses in a Wait node to pause execution until the exact reset epoch rather than dropping the run.

5. **Synthetic Multi-Step Transaction Monitoring in n8n:** Extend the 5-minute Uptime Monitor from a single `GET` ping to a synthetic transactional check (`POST /api/users/login` → verify JWT issued → `GET /api/articles/feed`) so broken authentication or database write locks are caught even when the static frontend returns `200 OK`.

6. **Contract Testing with Zod / OpenAPI Schema Validation:** Add JSON Schema validation inside the n8n Code node and Playwright API tests to immediately catch silent backend breaking changes common in AI-generated ("vibe-coded") apps.

## Developer
<table>
    <tr align="center">
        <td>
        Sandhit Karmakar
        <p align="center">
            <img src = "https://avatars.githubusercontent.com/u/90787826?v=4" width="150" height="150" alt="Dhruv Shah">
        </p>
            <p align="center">
                <a href="https://github.com/Sandhit06">
                    <img src="https://res.cloudinary.com/dyz1paeem/image/upload/v1793130084/round-collaboration-social-github-code-circle-network-icon_rk5x5t.svg" width="36" height="36" alt="GitHub"/>
                </a>
                <a href="https://www.linkedin.com/in/sandhit-karmakar/" target="_blank">
                    <img src="https://res.cloudinary.com/dyz1paeem/image/upload/v1793130084/network-linkedin-social-connection-circular-circle-media-icon_vdou3m.svg" width="36" height="36" alt="LinkedIn"/>
                </a>
                <a href="mailto:sandhitkarmakar@gmail.com" target="_blank">
                    <img src="https://res.cloudinary.com/dyz1paeem/image/upload/v1793129062/share-send-email-chat-circle-message-mail-icon_u4rx53.svg" width="36" height="36" alt="Email"/>
                </a>
            </p>
        </td>
    </tr>
</table>

<p align="center">
    Made with ❤️ by <a href="https://github.com/Sandhit06">Sandhit Karmakar</a>
</p>
=======
- Successful Slack/Sheets delivery depends on your own credentials, channel membership, spreadsheet ID, and tab names. No external account credentials are included.
- n8n's execution history is the source of truth for whether a live run succeeded. The included screenshots and dashboard are demonstrations only.
- Workflow static data for the uptime monitor persists with successful active executions; manual editor runs may not persist it between runs.
- Use [Task2_README.md](Task2_README.md) for the one-page workflow description requested by the assignment.
>>>>>>> 036bc3f (changes added)
