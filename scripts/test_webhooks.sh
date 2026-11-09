#!/usr/bin/env bash
set -euo pipefail

N8N_BASE_URL="${N8N_BASE_URL:-http://localhost:5678}"
WEBHOOK_PATH="${WEBHOOK_PATH:-/webhook/morning-brief}"

post_webhook() {
  local label="$1"
  local query="$2"
  local payload
  payload=$(printf '{"query":"%s","triggered_by":"qa-cli-smoke-test"}' "$query")

  printf '\n== %s ==\n' "$label"
  curl --fail-with-body --silent --show-error --max-time 30 \
    -X POST "${N8N_BASE_URL}${WEBHOOK_PATH}" \
    -H 'Content-Type: application/json' \
    --data "$payload"
  printf '\nWebhook acknowledged. Inspect n8n Executions for workflow completion.\n'
}

post_webhook 'Default AI and automation query' 'topic:automation+topic:ai'
post_webhook 'Custom Playwright testing query' 'topic:playwright+topic:testing'
