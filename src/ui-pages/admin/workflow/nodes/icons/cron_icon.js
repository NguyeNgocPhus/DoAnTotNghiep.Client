import { Button ,Typography} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import { ClockCircleOutlined } from '@ant-design/icons';
const handleStyle = { left: 10 };

export const CronIcon = () => {

    return (
        <div className="node_icon node_trigger_icon">
           <ClockCircleOutlined style={{color:'white'}}/>
        </div>
    );
}