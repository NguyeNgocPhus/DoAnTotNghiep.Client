import "./styles.css";
import 'reactflow/dist/style.css';
import { Modal, Form, Input, Upload, Button } from 'antd';
import {  UploadOutlined } from '@ant-design/icons';

export const FormUpload = ({open, onClose}) => {


    return (
        <Modal title="Nhập dữ liệu từ file excel" open={open} onCancel={onClose} footer={null}>
            <Form
                name="basic"
                layout="vertical"

                autoComplete="off"
            >
                <Form.Item
                    label="Tài liệu"
                    name="name"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên Workflow"
                    name="name"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Năm"
                    name="year"

                >
                    <Input />
                </Form.Item>
                <Form.Item

                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
                    </Upload>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>


    );
}

