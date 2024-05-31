import "./styles.css";
import 'reactflow/dist/style.css';
import { Modal, Form, Input, Upload, Button, message, Spin, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useImportData } from "../../../../store/import-template/use-import-data";
import { REQUEST_STATE } from "../../../../app-config/constants";
import { getToken } from "../../../../app-helper";

export const FormUpload = ({ hasWf, open, onClose, importTemplateId }) => {

    const [fileUploadId, setFileUploadId] = useState(null);
    const [importApiData, requestImportApiData] = useImportData();
    const [loading, setLoading] = useState(false);
    
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
        headers: { "Authorization": `Bearer ${jwt.accessToken}` },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
               
                message.success(`${info.file.name} tải dữ liệu thành công`);
                const fileId = info.file.response.value.id;
                setFileUploadId(fileId);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const onFinish = () => {
        if (!hasWf) {
            notification.error({
                message: 'vui lòng nhập thiết lập quy trình phê duyệt cho mẫu nhập',
            });


        }
        else if (fileUploadId === null) {

            notification.error({
                message: 'Vui lòng tải lên tài liệu',
            });
            return;
        } else {

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

                notification.success({
                    message: 'Nhập dữ liệu thành công',
                });
                onClose();

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
                        label="Vui lòng nhập định dạng mẫu báo cáo là file excel"
                        
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>

        </Modal>


    );
}

