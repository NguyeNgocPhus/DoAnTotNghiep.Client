import { Button, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import { ApproveIcon } from '../icons/approve_icon';
import { FileUploadIcon } from '../icons/file_upload_icon';
import "../styles.css";
const handleStyle = { left: 10 };

export const FileUploadNode = ({
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
        return state.connectionNodeId
    };

    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;


    const onClick = () => {
        data.callBackSetEdge();
    }


    const { name , description} = data;


    return (
        <div className="text-updater-node">
            {
                data.forceToolbarVisible &&
                <div style={{ position: 'absolute', top: '-50%' }}>
                    <button onClick={onClick}>Bước tiếp theo</button>

                </div>
            }
            <div className='node-info'>
                <div className='node-image'>
                    <FileUploadIcon></FileUploadIcon>
                </div>
                <div className='node-name'>
                    
                    <Typography.Text strong>{name}</Typography.Text>
                    <Typography.Text>{description}</Typography.Text>
                </div>
                
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