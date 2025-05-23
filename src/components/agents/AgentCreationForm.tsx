import React, { useState } from 'react';
import { generateULID, generatePrefixedId } from '../../utils/id-utils';

interface AgentFormData {
  agentId: string;
  name: string;
  type: string;
  orbitalLevel: number;
  bohrRadius: number;
  capabilities: string[];
  creatorId: string;
  blueprintId: string | null;
}

interface ResultData {
  success: boolean;
  message: string;
  data?: AgentFormData;
  error?: unknown;
}

const AgentCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<AgentFormData>({
    agentId: '',
    name: '',
    type: 'workflow',
    orbitalLevel: 1,
    bohrRadius: 1.0,
    capabilities: [],
    creatorId: 'current-user',
    blueprintId: null,
  });

  const [isGeneratingId, setIsGeneratingId] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<ResultData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCapabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedCapabilities = options.map(option => option.value);
    setFormData({ ...formData, capabilities: selectedCapabilities });
  };

  const generateNewId = () => {
    // Use either plain ULID or prefixed ULID based on user preference
    const newId = isGeneratingId 
      ? generatePrefixedId('agent')
      : generateULID();
    
    setFormData({ ...formData, agentId: newId });
  };

  const toggleIdGeneration = () => {
    setIsGeneratingId(!isGeneratingId);
    generateNewId();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Prepare the final form data with a generated ID if none is provided
      const finalFormData = {
        ...formData,
        agentId: formData.agentId || generateULID(),
      };
      
      // In a real application, this would be an API call
      // const response = await fetch('/api/agents', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(finalFormData),
      // });
      
      // For demo purposes, just log and set the result
      console.log('Submitting agent data:', finalFormData);
      setResult({
        success: true,
        message: 'Agent creation simulation successful',
        data: finalFormData
      });
    } catch (error) {
      console.error('Error creating agent:', error);
      setResult({
        success: false,
        message: 'Error creating agent',
        error
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Generate ID on first render
  React.useEffect(() => {
    generateNewId();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Quantum Agent</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-4 mb-2">
            <label htmlFor="agentId" className="text-sm font-medium">Agent ID:</label>
            <div className="flex-1">
              <input
                type="text"
                id="agentId"
                name="agentId"
                value={formData.agentId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Agent ID"
                readOnly={isGeneratingId}
                aria-describedby="agentIdHelp"
              />
            </div>
            <button
              type="button"
              onClick={generateNewId}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              aria-label="Generate new ID"
            >
              Generate New
            </button>
          </div>
          <div className="flex items-center" id="agentIdHelp">
            <input
              type="checkbox"
              checked={isGeneratingId}
              onChange={toggleIdGeneration}
              id="auto-generate-id"
              className="mr-2"
            />
            <label htmlFor="auto-generate-id" className="text-sm">
              Auto-generate using ULID
            </label>
          </div>
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Agent Name"
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="agentType" className="text-sm font-medium">Type:</label>
          <select
            id="agentType"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2 border rounded"
            title="Select agent type"
          >
            <option value="workflow">Workflow</option>
            <option value="script">Script</option>
            <option value="monitor">Monitor</option>
            <option value="security">Security</option>
            <option value="microservice">Microservice</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="orbitalLevel" className="text-sm font-medium">Orbital Level:</label>
            <input
              type="number"
              id="orbitalLevel"
              name="orbitalLevel"
              value={formData.orbitalLevel}
              onChange={handleChange}
              min="1"
              max="7"
              className="p-2 border rounded"
              title="Orbital level (1-7)"
              placeholder="Orbital level"
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <label htmlFor="bohrRadius" className="text-sm font-medium">Bohr Radius:</label>
            <input
              type="number"
              id="bohrRadius"
              name="bohrRadius"
              value={formData.bohrRadius}
              onChange={handleChange}
              min="0.1"
              max="10"
              step="0.1"
              className="p-2 border rounded"
              title="Bohr radius (0.1-10)"
              placeholder="Bohr radius"
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-1">
          <label htmlFor="capabilities" className="text-sm font-medium">Capabilities:</label>
          <select
            multiple
            id="capabilities"
            name="capabilities"
            value={formData.capabilities}
            onChange={handleCapabilityChange}
            className="p-2 border rounded h-32"
            title="Select agent capabilities"
            aria-describedby="capabilitiesHelp"
          >
            <option value="data_analysis">Data Analysis</option>
            <option value="workflow_automation">Workflow Automation</option>
            <option value="security_scanning">Security Scanning</option>
            <option value="nlp">Natural Language Processing</option>
            <option value="code_generation">Code Generation</option>
            <option value="data_visualization">Data Visualization</option>
            <option value="api_integration">API Integration</option>
            <option value="messaging">Messaging</option>
            <option value="encryption">Encryption</option>
            <option value="authentication">Authentication</option>
          </select>
          <p className="text-xs text-gray-500" id="capabilitiesHelp">Hold Ctrl/Cmd to select multiple</p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                agentId: '',
                name: '',
                type: 'workflow',
                orbitalLevel: 1,
                bohrRadius: 1.0,
                capabilities: [],
                creatorId: 'current-user',
                blueprintId: null,
              });
              generateNewId();
            }}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Reset
          </button>
          
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create Agent'}
          </button>
        </div>
      </form>
      
      {result && (
        <div className={`mt-6 p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <h3 className="font-bold">{result.success ? 'Success' : 'Error'}</h3>
          <p>{result.message}</p>
          {result.success && result.data && (
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      )}
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">About ULID Generation</h3>
        <p className="text-sm">
          This form uses Universally Unique Lexicographically Sortable Identifiers (ULIDs) for agent IDs. 
          ULIDs combine timestamp and randomness to create sortable, unique IDs.
          <a href="/docs/id-system" className="text-blue-500 hover:underline ml-1">
            Learn more about our ID system
          </a>.
        </p>
      </div>
    </div>
  );
};

export default AgentCreationForm; 