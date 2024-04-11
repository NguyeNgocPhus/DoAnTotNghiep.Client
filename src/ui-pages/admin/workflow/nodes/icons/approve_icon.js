import { Button ,Typography} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import { CheckOutlined } from '@ant-design/icons';
const handleStyle = { left: 10 };

export const ApproveIcon = () => {


    return (
        <div className="node_icon node_action_icon">
           <CheckOutlined style={{color:'white'}}/>
        </div>
    );
}