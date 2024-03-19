import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export const customNode = ({
    id,
    data,
    dragHandle,
    type,
    selected,
    isConnectable,
    zIndex,
    xPos,
    yPos,
    dragging,
    targetPosition,
    sourcePosition }) => {
        
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);
    const [count, setCount] = useState(data);


    return (
        <div className="text-updater-node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" />
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}