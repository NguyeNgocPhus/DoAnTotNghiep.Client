import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore,useStoreActions } from 'reactflow';

const handleStyle = { left: 10 };

export const SendEmailNode = ({
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
    const connectionNodeIdSelector = (state) => {
        // console.log("state",state);
        return state.connectionNodeId};
  
    const connectionNodeId = useStore(connectionNodeIdSelector);

    // console.log(connectionNodeId);
    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;
    // console.log(data.forceToolbarVisible);
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
        setText(evt.target.value);
    }, []);
    const onClick = () => {
        data.callBackSetEdge();
    }


    const { label, setText } = data;


    return (
        <div className="text-updater-node">
            {
                data.forceToolbarVisible &&
                <div style={{position:'absolute', top:'-50%'}}>
                    <button onClick={onClick}>Bước tiếp theo</button>

                </div>
            }

             <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div>
                <label htmlFor="text">{label} :</label>
                {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
            </div>
            {/* {/* <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            /> */}
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}