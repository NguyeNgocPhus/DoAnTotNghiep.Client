import { Button , Typography} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import "../styles.css";
import { RejectIcon } from '../icons/reject_icon';
import { UpdateStatusIcon } from '../icons/update_status';
const handleStyle = { left: 10 };

export const UpdateStatusNode = ({
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


    const onClick = (bool) => {
        data.callBackSetEdge(bool);
    }


    const { name, description } = data;


    return (
        <div className="text-updater-node">
            {
                data.forceToolbarVisible && (!data.isNodeCondition ?
                    <div style={{ position: 'absolute', top: '-50%' }}>
                        <button onClick={()=>onClick(undefined)}>Bước tiếp theo</button>
                    </div> :
                    <div style={{ position: 'absolute', top: '-50%' }}>
                        <button onClick={()=>onClick(true)}>Đúng</button>
                        <button onClick={()=>onClick(false)}>Sai</button>
                    </div>
                )
            }

            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div className='node-info'>
                <div className='node-image'>
                   <UpdateStatusIcon></UpdateStatusIcon>
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