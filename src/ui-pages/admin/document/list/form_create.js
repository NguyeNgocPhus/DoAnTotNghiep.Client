import "./styles.css";
import 'reactflow/dist/style.css';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
export const FormCreate = ({ setFileTemplateId, form, open, onClose, onFinish }) => {
    const props = {
        action: 'http://localhost:5000/Api/FileStorage/Upload',
        name: 'file',
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                console.log("info.file",info.file)
                const fileId = info.file.response.value.id;
                setFileTemplateId(fileId);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Modal title="Tạo mẫu nhập" open={open} onCancel={onClose} footer={null}>
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

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tags"
                    name="tag"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"

                >
                    <Input />
                </Form.Item>
                <Form.Item

                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Tải lên mẫu nhập</Button>
                    </Upload>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

