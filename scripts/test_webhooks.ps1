$ErrorActionPreference = 'Stop'

$n8nBaseUrl = if ($env:N8N_BASE_URL) { $env:N8N_BASE_URL } else { 'http://localhost:5678' }
$webhookPath = if ($env:WEBHOOK_PATH) { $env:WEBHOOK_PATH } else { '/webhook/morning-brief' }
$uri = "$n8nBaseUrl$webhookPath"

$queries = @(
    @{ Label = 'Default AI and automation query'; Query = 'topic:automation+topic:ai' },
    @{ Label = 'Custom Playwright testing query'; Query = 'topic:playwright+topic:testing' }
)

foreach ($item in $queries) {
    Write-Host "`n== $($item.Label) =="
    $body = @{ query = $item.Query; triggered_by = 'qa-cli-smoke-test' } | ConvertTo-Json -Compress
    $response = Invoke-RestMethod -Method Post -Uri $uri -ContentType 'application/json' -Body $body
    if ($null -ne $response) { $response | ConvertTo-Json -Depth 8 }
    Write-Host 'Webhook acknowledged. Inspect n8n Executions for workflow completion.'
}
