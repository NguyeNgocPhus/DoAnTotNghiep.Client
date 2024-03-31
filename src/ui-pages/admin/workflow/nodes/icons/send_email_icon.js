import { Button ,Typography} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import { SendOutlined } from '@ant-design/icons';
const handleStyle = { left: 10 };

export const SendEmailIcon = () => {


    return (
        <div className="approve_icon">
           <SendOutlined style={{color:'white'}}/>
        </div>
    );
}