import { Button ,Typography} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Handle, NodeToolbar, Position, useStore, useStoreActions } from 'reactflow';
import { FileAddOutlined } from '@ant-design/icons';
const handleStyle = { left: 10 };

export const FileUploadIcon = () => {



    return (
        <div className="approve_icon">
           <FileAddOutlined style={{color:'white'}}/>
        </div>
    );
}