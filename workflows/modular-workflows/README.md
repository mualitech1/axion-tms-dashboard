# AetherForge Modular Workflow System

This directory contains modular workflow components for the AetherForge quantum agent system. The workflows have been divided into logical modules to make them easier to maintain, import, and debug.

## Modular Workflow Components

The AetherForge Quantum Agent Creation workflow has been divided into the following modules:

1. **quantum-agent-initialization.json** - Handles the initial agent parameter validation and checks for existing agents
2. **quantum-agent-blueprint-processing.json** - Processes blueprints and prepares agent base data with type validation
3. **quantum-agent-entanglement.json** - Handles agent compatibility, tunneling, and entanglement calculations
4. **quantum-agent-state-evolution.json** - Calculates quantum states, orbital positions, and evolution trajectories
5. **quantum-agent-telemetry-response.json** - Generates visualizations, logs telemetry, and formats the API response

## Importing Workflow Modules into n8n

To use these modular workflow components in n8n:

1. Open your n8n instance
2. Navigate to "Workflows" in the main menu
3. Click "Import from File" or use the import button
4. Select one of the modular workflow files to import
5. Repeat for each module you want to import

## Connecting the Modules

After importing all modules, you'll need to connect them to create a complete workflow:

1. In your main workflow, add a Webhook node as the entry point
2. Use the "n8n-nodes-base.executeWorkflow" node to execute each module in sequence:
   - Configure each Execute Workflow node to point to one of the imported modules
   - Pass the data between modules using the Workflow ID and input data parameters

### Example Connection Flow

```
Webhook → Execute "initialization" → Execute "blueprint-processing" → Execute "entanglement" → Execute "state-evolution" → Execute "telemetry-response" → Respond to Webhook
```

## Troubleshooting

If you encounter issues with the modular workflows:

1. Check that all credential placeholders (`YOUR_SUPABASE_CREDENTIAL_ID`) have been replaced with actual credential IDs
2. Verify that the data is being correctly passed between modules
3. Look for missing parameters or configuration in the Supabase nodes
4. Test each module individually before connecting them together

## Production Setup Notes

For production use:

1. Update all placeholder credentials with actual production credentials
2. Add error handling nodes between each module execution to handle failures gracefully
3. Consider adding logging nodes to track workflow execution
4. Set appropriate timeouts for long-running operations
5. Configure webhook security settings to prevent unauthorized access

## Axion TMS Dashboard Specific Workflows

The Axion TMS Dashboard also includes these additional workflows:

- `Customer Experience Enhancement System.json`
- `Automated Financial Operations Workflow.json`
- `Intelligent-job-assignment &-dispatching system.json`

These workflows can be imported directly without modularization since they're self-contained and focused on specific business functions. 