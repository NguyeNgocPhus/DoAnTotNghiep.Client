import { Button ,Typography} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import { BranchesOutlined } from '@ant-design/icons';
const handleStyle = { left: 10 };

export const BranchIcon = () => {

    return (
        <div className="approve_icon">
           <BranchesOutlined  style={{color:'white'}}/>
        </div>
    );
}