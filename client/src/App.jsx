// src/App.jsx
import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  applyEdgeChanges, 
  applyNodeChanges,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextInputNode from './components/nodesj/TextInputNode';
import ResultNode from './components/nodesj/ResultNode';
import { runFlow, saveFlow } from './services/api'; // <--- Import saveFlow
import './App.css';

const nodeTypes = {
  textInput: TextInputNode,
  result: ResultNode,
};

const initialNodes = [
  {
    id: 'input-1',
    type: 'textInput',
    position: { x: 100, y: 200 },
    data: { value: 'What is the capital of France?', onChange: () => {} },
  },
  {
    id: 'result-1',
    type: 'result',
    position: { x: 600, y: 200 },
    data: { label: '', isLoading: false },
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: 'input-1', 
    target: 'result-1', 
    animated: true, 
    style: { stroke: '#3b82f6', strokeWidth: 2 } 
  },
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  
  // State to track data for saving
  const [inputValue, setInputValue] = useState(initialNodes[0].data.value);
  const [currentResult, setCurrentResult] = useState(""); // <--- New state for result

  const onInputChange = useCallback((text) => {
    setInputValue(text);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'input-1') {
          return { ...node, data: { ...node.data, value: text } };
        }
        return node;
      })
    );
  }, []);

  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'input-1') {
          return { ...node, data: { ...node.data, onChange: onInputChange } };
        }
        return node;
      })
    );
  }, [onInputChange]);

  const handleRunFlow = async () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'result-1') {
          return { ...node, data: { ...node.data, isLoading: true } };
        }
        return node;
      })
    );

    const result = await runFlow(inputValue);
    
    // Update local state so we can save it later
    setCurrentResult(result); 

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'result-1') {
          return { ...node, data: { ...node.data, label: result, isLoading: false } };
        }
        return node;
      })
    );
  };

  // --- NEW HANDLER ---
  const handleSave = async () => {
    if (!currentResult) {
      alert("Please run the flow first!");
      return;
    }
    const response = await saveFlow(inputValue, currentResult);
    if (response) {
      alert("Saved successfully!");
    } else {
      alert("Failed to save.");
    }
  };

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#ccc" gap={20} />
        <Controls />
      </ReactFlow>

      <div className="button-container">
        {/* Run Button */}
        <button onClick={handleRunFlow} className="run-button">
          Run Flow
        </button>
        
        {/* Save Button */}
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default App;