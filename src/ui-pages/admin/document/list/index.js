import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Upload, Spin } from 'antd';
import { SearchOutlined, PlusOutlined, CheckOutlined, UploadOutlined, HistoryOutlined } from '@ant-design/icons';
import { FormCreate } from './form_create';
import { FormUpload } from './form_upload';
import { useGetListImportTemplate } from '../../../../store/import-template/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
const { Title } = Typography;


export const ListDocument = () => {
    const columns = [
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
            render: (_, { code }) => (
                <>
                    <Row gutter={[10, 20]}>
                        <Col>
                            <HistoryOutlined style={{ cursor: 'pointer' }} onClick={onClickViewHistory} />
                        </Col>
                        <Col>
                            <UploadOutlined style={{ cursor: 'pointer' }} onClick={onClickUploadDocument} />
                        </Col>
                    </Row>



                </>
            ),
        },
    ];

    const [listImportTemplateApiData, requestListImportTemplateApi] = useGetListImportTemplate();
    const [formCreateOpen, setFormCreateOpen] = useState(false);
    const [formUploadOpen, setFormUploadOpen] = useState(false);
    const [listImportTemplate, setListImportTemplate ] = useState([]);
    const [loading, setLoading] = useState(false);

    const showFormCreate = () => {
        setFormCreateOpen(true);
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

    useEffect(()=>{
        requestListImportTemplateApi();
    },[])
    useEffect(() => {
        if (listImportTemplateApiData !== null) {
            if (listImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                var data = listImportTemplateApiData.data.map(x=>{
                    return {
                        name : x.name,
                        tag : x.tag,
                        hasWorkflow : x.hasWorkflow,
                        active : x.active,
            
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
                       {listImportTemplate.length > 0 &&  <Table columns={columns} dataSource={listImportTemplate} />}
                    </Spin>
                </Col>
            </Row>
            <FormCreate open={formCreateOpen} onClose={()=>{setFormCreateOpen(false)}}></FormCreate>
            <FormUpload open={formUploadOpen} onClose={()=>{setFormUploadOpen(false)}}></FormUpload>

        </>

    );
}

