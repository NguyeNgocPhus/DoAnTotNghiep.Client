import { Button ,Typography} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import { CloseOutlined } from '@ant-design/icons';
const handleStyle = { left: 10 };

export const RejectIcon = () => {
    return (
        <div className="node_icon node_action_icon">
           <CloseOutlined style={{color:'white'}}/>
        </div>
    );
}