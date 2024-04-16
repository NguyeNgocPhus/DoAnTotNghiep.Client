import "./styles.css";
import 'reactflow/dist/style.css';
import { Modal, Form, Input, Upload, Button, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useImportData } from "../../../../store/import-template/use-import-data";
import { REQUEST_STATE } from "../../../../app-config/constants";

export const FormUpload = ({ open, onClose, importTemplateId }) => {

    const [fileUploadId, setFileUploadId] = useState(null);
    const [importApiData, requestImportApiData] = useImportData();
    const [loading, setLoading] = useState(false);


    const props = {
        action: 'http://localhost:5000/Api/FileStorage/Upload',
        name: 'file',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                const fileId = info.file.response.value.id;
                setFileUploadId(fileId);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const onFinish = () => {
        if (fileUploadId === null) {
            message.error(`vui lòng nhập file`);
            return;
        } else {
            console.log("fileUploadId", fileUploadId);
            console.log("importTempateId", importTemplateId)
            requestImportApiData({
                importTemplateId,
                fileUploadId
            })
        }
    }


    useEffect(() => {
        if (importApiData !== null) {
            if (importApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                message.success("import data success");

            } else if (importApiData.state === REQUEST_STATE.ERROR) {

            } else if (importApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [importApiData]);
    return (
        <Modal title="Nhập dữ liệu từ file excel" open={open} onCancel={onClose} footer={null}>
            <Spin size="large" spinning={loading}>
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>

        </Modal>


    );
}

