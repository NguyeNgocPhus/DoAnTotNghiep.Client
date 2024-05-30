import { Button ,Typography} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import { FormOutlined } from '@ant-design/icons';
const handleStyle = { left: 10 };

export const UpdateStatusIcon = () => {


    return (
        <div className="node_icon node_action_icon">
           <FormOutlined style={{color:'white'}}/>
        </div>
    );
}