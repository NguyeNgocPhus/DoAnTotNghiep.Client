import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Upload, Spin } from 'antd';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { SearchOutlined, DeleteOutlined, CheckOutlined, UploadOutlined, HistoryOutlined } from '@ant-design/icons';
import { useGetListApprove } from '../../../../store/approve/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
const { Title } = Typography;


export const ListApprove = () => {
    const columns = [

        {
            title: 'Create Name',
            key: 'createdByName',
            dataIndex: 'createdByName',
            render: (_, { createdByName }) => (
                <>
                    {createdByName && <div>{createdByName}</div>}
                </>
            ),
        },
        {
            title: 'ImportTemplate Name',
            key: 'importTemplateName',
            dataIndex: 'importTemplateName',
            render: (_, { importTemplateName }) => (
                <>
                    {importTemplateName && <div>{importTemplateName}</div>}
                </>
            ),
        },
        {
            title: 'File Upload',
            key: 'fileId',
            dataIndex: 'fileId',
            render: (_, { fileId }) => (
                <>
                    {fileId && <Typography.Link href={`http://localhost:5000/Api/FileStorage/Get/${fileId}`} >Download</Typography.Link>}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <a>{text}</a>,
        },

        {
            title: '',
            key: 'action',
            dataIndex: 'action',
            render: (_, { key }) => (
                <>
                    {/* {console.log("JKey", key)} */}
                    <Row gutter={[10, 20]}>

                        <Col className='import_teamplate_action_icon'>
                            <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
                        </Col>
                    </Row>



                </>
            ),
        },
    ];


    const [listApproveApiData, requestListApproveApi] = useGetListApprove();
    const [listApprove, setListApprove] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        requestListApproveApi();
    }, [])


    useEffect(() => {
        if (listApproveApiData !== null) {
            if (listApproveApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                // console.log("listImportTemplateApiData.state",listImportTemplateApiData.data);
                var data = listApproveApiData.data.map(x => {
                    return {

                        importTemplateName: x.importTemplateName,
                        createdByName: x.createdByName,
                        key: x.id,
                        status: x.status,
                        fileId: x.fileId

                    }
                });
                setListApprove(data);

            } else if (listApproveApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (listApproveApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [listApproveApiData])

    return (
        <>
            <Row style={{ padding: '20px' }} gutter={[0, 32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách dữ liệu phê duyệt</Title>
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên mẫu nhập" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Spin size="large" spinning={loading}>
                        <Table columns={columns} dataSource={listApprove} />
                    </Spin>
                </Col>
            </Row>


        </>

    );
}

