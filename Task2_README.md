# Task 2 — GitHub Morning Brief

**Workflow:** `workflows/Task2_Workflow_Sandhit_Karmakar.json`

The workflow searches GitHub repositories tagged for automation and AI. It accepts an hourly Schedule Trigger or a `POST /webhook/morning-brief` Webhook Trigger. GitHub Search returns up to 15 repositories; a Code node removes archived, disabled, or undescribed repositories, computes `stars + 2 × forks + min(open issues, 200)`, sorts by that score, and keeps five. For each result, HTTP Request nodes fetch the repository README and search Hacker News Algolia. A Code node adds a short README excerpt and discussion counts. An IF node routes repositories above 1,000 stars to Slack and the rest to a Google Sheets watchlist.

GitHub uses n8n Header Auth credentials. Slack and Google Sheets use n8n's credential store; no secrets are included in this export. The spreadsheet ID is read from `GSHEETS_WATCHLIST_DOC_ID`; the sheet tab must be `Emerging_Repos_Under_1000_Stars`. Set the Slack channel environment variables or update the node destinations to match your workspace.

GitHub Search and README request failures use their error outputs and retry settings to create a structured fallback message. Transformation errors and Slack/Sheets delivery errors are also routed to that fallback. The fallback notification itself needs a working Slack credential. Failures that occur outside these configured node branches appear as failed executions in n8n; this workflow does not claim to have a separate global Error Trigger workflow configured.

The webhook acknowledges receipt immediately with HTTP 200. Check **Executions** in n8n for the actual result. Both exported workflows import inactive; configure credentials, destinations, then activate. The included execution image is illustrative, not evidence of a live run. A real successful execution still needs to be captured from n8n after setup.
