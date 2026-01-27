// src/components/nodes/TextInputNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Pencil } from 'lucide-react'; // Icon
import './nodes.css'; // We will add specific styles below

const TextInputNode = ({ data, isConnectable }) => {
  return (
    <div className="custom-node input-node">
      <div className="node-header">
        <span className="node-title">Text Input Node</span>
        <Pencil size={14} className="node-icon" />
      </div>
      <div className="node-body">
        <textarea 
          className="nodrag" // 'nodrag' allows typing without dragging the node
          value={data.value} 
          onChange={(evt) => data.onChange(evt.target.value)}
          placeholder="Type your prompt here..."
          rows={3}
        />
      </div>
      {/* Source handle for the connection line */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="custom-handle"
      />
    </div>
  );
};

export default memo(TextInputNode);