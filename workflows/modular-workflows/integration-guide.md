# AetherForge Modular Workflow Integration Guide

This guide provides step-by-step instructions for integrating the AetherForge modular workflow components in n8n.

## Prerequisites

- n8n instance (v0.170.0 or higher recommended)
- Supabase account with appropriate API credentials
- Access to all workflow module files

## Step 1: Import the Module Workflows

1. Log in to your n8n instance
2. Navigate to **Workflows** in the left sidebar
3. Click the **Import from File** button (or **Import from URL** if the files are hosted)
4. Import each of the following module files in order:
   - `quantum-agent-initialization.json`
   - `quantum-agent-blueprint-processing.json`
   - `quantum-agent-entanglement.json`
   - `quantum-agent-state-evolution.json`
   - `quantum-agent-telemetry-response.json`
5. After importing, make sure to **Save** each workflow

## Step 2: Configure Supabase Credentials

For each module that uses Supabase:

1. Open the module workflow
2. For each Supabase node:
   - Click on the node to open its settings
   - Go to the **Credentials** tab
   - Either select an existing Supabase credential or create a new one
   - Replace the placeholder `YOUR_SUPABASE_CREDENTIAL_ID` with your actual credential ID
3. Save the workflow after configuring all nodes

## Step 3: Take Note of Workflow IDs

For each imported module:

1. Open the workflow
2. Look at the URL, which will be in the format: `https://your-n8n-instance.com/workflow/123`
3. The number at the end is the workflow ID (in this example, 123)
4. Record the ID for each module in the following table:

| Module | Workflow ID |
|--------|-------------|
| Initialization | ___________ |
| Blueprint Processing | ___________ |
| Entanglement | ___________ |
| State & Evolution | ___________ |
| Telemetry & Response | ___________ |

## Step 4: Import and Configure the Master Workflow

1. Import the `aetherforge-quantum-master-workflow.json` file
2. Open the master workflow and configure each "Execute Workflow" node:
   - Replace the placeholder `REPLACE_WITH_WORKFLOW_ID` with the corresponding workflow ID from Step 3
   - Alternatively, set environment variables for each ID:
     ```
     QUANTUM_INIT_WORKFLOW_ID
     QUANTUM_BLUEPRINT_WORKFLOW_ID
     QUANTUM_ENTANGLEMENT_WORKFLOW_ID
     QUANTUM_STATE_WORKFLOW_ID
     QUANTUM_TELEMETRY_WORKFLOW_ID
     ```
3. Save the master workflow

## Step 5: Configure Webhook Endpoints

1. In the master workflow, click on the webhook node "Webhook: Create Quantum Agent"
2. Note the webhook URL, which will be in the format: `https://your-n8n-instance.com/webhook/path/quantum-agent/create`
3. Configure your client application to send POST requests to this endpoint

## Step 6: Test the Workflow

1. Activate all module workflows by toggling the "Active" switch for each
2. Activate the master workflow
3. Send a test POST request to the webhook URL with the following sample payload:

```json
{
  "agentId": "test-agent-123",
  "name": "Test Quantum Agent",
  "type": "workflow",
  "orbitalLevel": 2,
  "bohrRadius": 1.5,
  "capabilities": ["data_analysis", "workflow_automation"],
  "creatorId": "test-user"
}
```

4. Verify that the workflow executes successfully and returns a 201 response

## Troubleshooting

If you encounter issues:

1. **Check the logs**: Use the n8n execution log to identify which module is failing
2. **Verify data format**: Make sure the data passed between modules has the expected structure
3. **Test individual modules**: Execute individual modules directly to isolate problems
4. **Check credentials**: Ensure Supabase credentials are valid and have appropriate permissions
5. **API limits**: Be aware of Supabase rate limits if running multiple executions

## Production Deployment Considerations

For production deployment:

1. **Secure webhooks**: Use n8n webhook authentication options
2. **Set up error notifications**: Configure n8n to send alerts on workflow failures
3. **Monitor execution history**: Regularly check workflow execution logs
4. **Consider workflow versioning**: Create backup copies before major changes
5. **Set appropriate timeouts**: Configure longer timeouts for complex operations

## Additional Resources

- [n8n Webhook Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [n8n Execute Workflow Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/)
- [Supabase Node Documentation](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/) 