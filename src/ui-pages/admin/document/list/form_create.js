import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography, Tabs, Modal, Form, Input, Button } from 'antd';

export const FormCreate = ({open, onClose}) => {


    return (
        <Modal title="Tạo mẫu nhập" open={open} onCancel={onClose}  footer={null}>
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
                    {/* <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
                        </Upload> */}
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

