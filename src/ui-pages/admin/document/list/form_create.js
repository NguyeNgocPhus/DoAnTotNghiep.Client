import "./styles.css";
import 'reactflow/dist/style.css';
import { Modal, Form, Input, Button, Upload } from 'antd';
import {  UploadOutlined } from '@ant-design/icons';
export const FormCreate = ({ form, open, onClose, onFinish }) => {

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
                  <Upload>
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

