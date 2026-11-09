#!/usr/bin/env bash
# ==============================================================================
# Oytra Automation & QA Developer Assessment — n8n Webhook Test Harness
# Candidate: Sandhit Karmakar
# ==============================================================================
set -euo pipefail

N8N_BASE_URL="${N8N_BASE_URL:-http://localhost:5678}"
WEBHOOK_PATH="${WEBHOOK_PATH:-/webhook/morning-brief}"

echo "=================================================================="
echo "1. Testing Task 2 Webhook — Happy Path (Default AI & Automation)"
echo "=================================================================="
curl -i -s -X POST "${N8N_BASE_URL}${WEBHOOK_PATH}" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "topic:automation+topic:ai+pushed:>2026-10-01",
    "triggered_by": "qa-cli-smoke-test"
  }' | head -n 35

echo ""
echo "=================================================================="
echo "2. Testing Task 2 Webhook — Custom Topic Filter (Playwright QA)"
echo "=================================================================="
curl -i -s -X POST "${N8N_BASE_URL}${WEBHOOK_PATH}" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "topic:playwright+topic:testing+pushed:>2026-09-01",
    "triggered_by": "qa-custom-topic-test"
  }' | head -n 35

echo ""
echo "Done. Both webhook payloads dispatched successfully."
