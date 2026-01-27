// src/components/nodes/ResultNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Sparkles } from 'lucide-react'; // Icon for AI result

const ResultNode = ({ data, isConnectable }) => {
  return (
    <div className="custom-node result-node">
      {/* Target handle to receive the connection */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="custom-handle"
      />
      <div className="node-header">
        <span className="node-title">Result Node</span>
      </div>
      <div className="node-body result-body">
        {data.isLoading ? (
          <span className="loading-text">Generating...</span>
        ) : (
          <div className="result-content">
            <Sparkles size={16} className="result-icon" />
            <span>{data.label || "Run the flow to see result"}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ResultNode);