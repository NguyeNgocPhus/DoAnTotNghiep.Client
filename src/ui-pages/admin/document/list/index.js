import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Upload, Spin } from 'antd';
import { SearchOutlined, PlusOutlined, CheckOutlined, EditOutlined, UploadOutlined, HistoryOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormCreate } from './form_create';
import { FormUpload } from './form_upload';
import { useGetListImportTemplate } from '../../../../store/import-template/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { useCreateImportTemplate } from '../../../../store/import-template/use-create-import-template';
import { useDeleteImportTemplate } from '../../../../store/import-template/use-delete-import-template';
import { History } from './history';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
const { Title } = Typography;


export const ListDocument = () => {
    const columns = [
        {
            title: 'Tên Mẫu nhập',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Loại Mẫu nhập',
            dataIndex: 'tag',
            key: 'tag',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Trạng thái',
            key: 'active',
            dataIndex: 'active',
            render: (_, { active }) => (
                <>
                    {active && <CheckOutlined style={{ color: 'green' }} />}
                </>
            ),
        },
        {
            title: 'Đã có quy trình',
            key: 'hasWorkflow',
            dataIndex: 'hasWorkflow',
            render: (_, { hasWorkflow }) => (
                <>
                    {hasWorkflow && <CheckOutlined style={{ color: 'green' }} />}
                </>
            ),
        },
        {
            title: 'Tải mẫu nhập',
            key: 'fileTemplateId',
            dataIndex: 'fileTemplateId',
            render: (_, { fileTemplateId }) => (
                <>
                    {fileTemplateId && <Typography.Link href={`http://localhost:5000/Api/FileStorage/Get/${fileTemplateId}?name=TCKT`}>Tải xuống</Typography.Link>}
                </>
            ),
        },
        {
            title: '',
            key: 'action',
            dataIndex: 'action',
            render: (_, data) => (
                <>
                    {/* {console.log("JKey", key)} */}
                    <Row gutter={[10, 20]}>
                        <Col className='import_teamplate_action_icon'>
                            <EditOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onUpdateImportTemplate(data.key);
                            }

                            } />
                        </Col>
                        <Col className='import_teamplate_action_icon'>
                            <HistoryOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onClickViewHistory(data)
                            }} />
                        </Col>
                        <Col className='import_teamplate_action_icon' >
                            <UploadOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onClickUploadDocument(data.key)
                            }} />
                        </Col>
                        <Col className='import_teamplate_action_icon'>
                            <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
                                onDeleteImportTemplate(data.key)
                            }} />
                        </Col>
                    </Row>



                </>
            ),
        },
    ];

    const [createImportTemplateApiData, requestCreateImportTemplateApiData] = useCreateImportTemplate();
    const [deleteImportTemplateApiData, requestDeleteImportTemplateApiData] = useDeleteImportTemplate();
    const [listImportTemplateApiData, requestListImportTemplateApi] = useGetListImportTemplate();
    const [formCreateOpen, setFormCreateOpen] = useState(false);
    const [formUploadOpen, setFormUploadOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [dataHistory, setDataHistory] = useState(null);
    const [listImportTemplate, setListImportTemplate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [fileTemplateId, setFileTemplateId] = useState(null);
    const [importTemplateId, setImportTemplateId] = useState(null);

    const showFormCreate = () => {
        setFormCreateOpen(true);
    };


    const onCreateImportTemplate = (values) => {
        // console.log("Onfinish",{...values, fileTemplateId})
        form.resetFields();
        requestCreateImportTemplateApiData({ ...values, fileTemplateId });
    };
    const onUpdateImportTemplate = (id) => {
        setFormCreateOpen(true);
    };
    const onDeleteImportTemplate = (id) => {
        // console.log(id);
        requestDeleteImportTemplateApiData({ id });
    };

    const onClickViewHistory = (data) => {
        // setHistoryOpen(true);
        navigate(`/admin/history/${data.key}`)
    }
    const onClickUploadDocument = (id) => {
        setImportTemplateId(id);
        setFormUploadOpen(true);
    }


    useEffect(() => {
        requestListImportTemplateApi();
    }, [])
    useEffect(() => {
        if (listImportTemplateApiData !== null) {
            if (listImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                // console.log("listImportTemplateApiData.state",listImportTemplateApiData.data);
                var data = listImportTemplateApiData.data.map(x => {
                    return {
                        // id: x.id,
                        name: x.name,
                        tag: x.tag,
                        key: x.id,
                        hasWorkflow: x.hasWorkflow,
                        active: x.active,
                        fileTemplateId: x.fileTemplateId

                    }
                });
                setListImportTemplate(data);

            } else if (listImportTemplateApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (listImportTemplateApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [listImportTemplateApiData])

    useEffect(() => {
        if (deleteImportTemplateApiData !== null) {
            if (deleteImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                var newData = listImportTemplate.filter(x => x.id !== deleteImportTemplateApiData.data.id);
                setListImportTemplate(newData);
            } else if (deleteImportTemplateApiData.state === REQUEST_STATE.ERROR) {

            } else if (deleteImportTemplateApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [deleteImportTemplateApiData])

    useEffect(() => {
        if (createImportTemplateApiData !== null) {
            if (createImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                setFormCreateOpen(false);
                setListImportTemplate([{
                    id: createImportTemplateApiData.data.id,
                    name: createImportTemplateApiData.data.name,
                    description: createImportTemplateApiData.data.description,
                    tag: createImportTemplateApiData.data.tag,
                    active: 1
                }, ...listImportTemplate]);
            } else if (createImportTemplateApiData.state === REQUEST_STATE.ERROR) {

            } else if (createImportTemplateApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [createImportTemplateApiData]);
    return (
        <>
            <AdminCommomLayout>
                <Row style={{ padding: '20px' }} gutter={[0, 32]}>
                    <Col span={24}>
                        <div className='header_list_users'>
                            <Title level={5}>Danh sách mẫu nhập</Title>
                            <div>
                                <Button onClick={showFormCreate} icon={<PlusOutlined />} type="primary" size="large">Tạo mẫu nhập</Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên mẫu nhập" prefix={<SearchOutlined />} />
                    </Col>
                    <Col span={24}>
                        <Spin size="large" spinning={loading}>
                            {listImportTemplate.length > 0 && <Table size="middle" columns={columns} dataSource={listImportTemplate} />}
                        </Spin>
                    </Col>
                </Row>
                <FormCreate setFileTemplateId={setFileTemplateId} form={form} open={formCreateOpen} onClose={() => { setFormCreateOpen(false) }} onFinish={onCreateImportTemplate}></FormCreate>
                <FormUpload importTemplateId={importTemplateId} open={formUploadOpen} onClose={() => { setFormUploadOpen(false) }}></FormUpload>
                {/* <History dataHistory={dataHistory} historyOpen={historyOpen} setHistoryOpen={setHistoryOpen} ></History> */}
            </AdminCommomLayout>
        </>

    );
}

