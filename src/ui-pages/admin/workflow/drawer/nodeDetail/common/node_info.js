import { Typography, Input } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useState } from "react";

export const NodeInfo = ({ setDescription, icon, name, description }) => {
    const [showInputEdit, setShowInputEdit] = useState(false);
    const onChange = (e) =>{
        setDescription( e.target.value)
    }
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
                    {showInputEdit && <Input value={description} onChange={onChange} onPressEnter={() => { setShowInputEdit(false) }}></Input>}
                    {!showInputEdit && <EditOutlined onClick={() => { setShowInputEdit(true) }} style={{ cursor: 'pointer' }} />}
                </div>
            </div>
        </>
    );
}