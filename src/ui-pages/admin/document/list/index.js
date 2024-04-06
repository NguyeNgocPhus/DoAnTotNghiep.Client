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
const { Title } = Typography;


export const ListDocument = () => {
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Active',
            key: 'active',
            dataIndex: 'active',
            render: (_, { active }) => (
                <>
                    {active && <CheckOutlined />}
                </>
            ),
        },
        {
            title: 'Workflow',
            key: 'hasWorkflow',
            dataIndex: 'hasWorkflow',
            render: (_, { hasWorkflow }) => (
                <>
                    {hasWorkflow && <CheckOutlined />}
                </>
            ),
        },
        {
            title: '',
            key: 'action',
            dataIndex: 'action',
            render: (_, { id }) => (
                <>
                    <Row gutter={[10, 20]}>
                        <Col className='import_teamplate_action_icon'>
                            <EditOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onUpdateImportTemplate(id);
                            }

                            } />
                        </Col>
                        <Col className='import_teamplate_action_icon'>
                            <HistoryOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onClickViewHistory(id)
                            }} />
                        </Col>
                        <Col className='import_teamplate_action_icon' >
                            <UploadOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onClickUploadDocument(id)
                            }} />
                        </Col>
                        <Col className='import_teamplate_action_icon'>
                            <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
                                onDeleteImportTemplate(id)
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
    const [listImportTemplate, setListImportTemplate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();



    const showFormCreate = () => {
        setFormCreateOpen(true);
    };


    const onCreateImportTemplate = (values) => {
        form.resetFields();
        requestCreateImportTemplateApiData(values);
    };
    const onUpdateImportTemplate = (id) => {

    };
    const onDeleteImportTemplate = (id) => {
        console.log(id);
        requestDeleteImportTemplateApiData({ id });
    };

    const onClickViewHistory = () => {
        console.log("onClickViewHistory")
    }
    const onClickUploadDocument = () => {
        setFormUploadOpen(true);
    }
    const props = {
        action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        previewFile(file) {
            console.log('Your upload file:', file);
            // Your process logic. Here we just mock to the same file
            return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
                method: 'POST',
                body: file,
            })
                .then((res) => res.json())
                .then(({ thumbnail }) => thumbnail);
        },
    };

    useEffect(() => {
        requestListImportTemplateApi();
    }, [])
    useEffect(() => {
        if (listImportTemplateApiData !== null) {
            if (listImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);

                var data = listImportTemplateApiData.data.map(x => {
                    return {
                        id: x.id,
                        name: x.name,
                        tag: x.tag,
                        hasWorkflow: x.hasWorkflow,
                        active: x.active,

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
                        {listImportTemplate.length > 0 && <Table columns={columns} dataSource={listImportTemplate} />}
                    </Spin>
                </Col>
            </Row>
            <FormCreate form={form} open={formCreateOpen} onClose={() => { setFormCreateOpen(false) }} onFinish={onCreateImportTemplate}></FormCreate>
            <FormUpload open={formUploadOpen} onClose={() => { setFormUploadOpen(false) }}></FormUpload>

        </>

    );
}

