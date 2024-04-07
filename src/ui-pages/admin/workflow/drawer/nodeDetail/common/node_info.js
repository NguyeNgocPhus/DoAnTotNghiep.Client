import { Row, Col, Divider, Typography, Input, Select, Button } from "antd";
import { CloseCircleOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import { FileUploadIcon } from "../../../nodes/icons/file_upload_icon";
import { useState } from "react";

export const NodeInfo = ({ icon, name, description }) => {
    const [showInputEdit, setShowInputEdit] = useState(false);

    return (
        <>
            <div className='node-image'>
                {icon}
            </div>
            <div className='node-name'>
                {/* <div htmlFor="text">{data?.type}</div> */}
                <Typography.Text strong>{name}</Typography.Text>
                <div>
                    {!showInputEdit && <Typography.Text>{description}</Typography.Text>}
                    {showInputEdit && <Input></Input>} 
                    {!showInputEdit && <EditOutlined onClick={()=>{setShowInputEdit(true)}} style={{cursor:'pointer'}}/> }
                </div>
            </div>
        </>
    );
}