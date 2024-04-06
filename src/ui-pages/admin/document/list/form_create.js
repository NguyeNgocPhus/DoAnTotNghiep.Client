import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography, InputNumber, Modal, Form, Input, Button } from 'antd';
import { useCreateImportTemplate } from "../../../../store/import-template/use-create-import-template";
import { useEffect } from "react";

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
                    label="Thứ tự hiển thị"
                    name="displayOrder"
                >
                    <InputNumber />
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

