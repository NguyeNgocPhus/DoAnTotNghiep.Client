import "./styles.css";
import 'reactflow/dist/style.css';
import { Modal, Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getToken } from "../../../../app-helper";
import { useState } from "react";
const tags = [

    {label:"Tài chính kế toán", value:"TCKT"},
    {label:"Kết quả kinh doanh", value:"KQKD"},
    {label:"Công nợ phải thu/phải trả", value:"CN"},
    {label:"Báo cáo đầu tư", value:"DT"}
]
export const FormCreate = ({ setFileTemplateId, form, open, onClose, onFinish }) => {
    var jwt = getToken();
    const beforeUpload = (file) => {

        const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isXlsx) {
          message.error('Dữ liệu không đúng định đạng');
        }
        
        return isXlsx;
      };
    const props = {
        action: 'http://localhost:5000/Api/FileStorage/Upload',
        name: 'file',
        beforeUpload: beforeUpload,
        
        headers:{ "Authorization": `Bearer ${jwt.accessToken}` },
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name}  mẫu được tải lên thành công`);
                const fileId = info.file.response.value.id;   
                setFileTemplateId(fileId);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} mẫu tải lên lỗi`);
            }
        },
    };
    const [tag, setTag] = useState(null);
const handleSelectChange = (value) =>{
    setTag(value);
}

    return (
        <Modal title="Tạo mẫu báo cáo" open={open} onCancel={onClose} footer={null}>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Tài liệu"
                    name="name"
                    rules={[
                        { required: true, message: 'Nhập tên tài liệu' },
                    ]}
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Loại báo cáo"
                    name="tag"
                    rules={[{ required: true, message: 'Chọn loại báo cáo' }]}
                >
                     {tags.length > 0 && <Select
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            value={tag}
                            placeholder="Chọn loại báo cáo"
                            onChange={handleSelectChange}
                            options={tags}
                        />}
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Vui lòng nhập định dạng mẫu báo cáo là file excel"
                
                >
                    <Upload  name="avatar" className="avatar-uploader" {...props}>
                        <Button icon={<UploadOutlined />}>Tải lên mẫu báo cáo</Button>
                    </Upload>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Tạo mới
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

