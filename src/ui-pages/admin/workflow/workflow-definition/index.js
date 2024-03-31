import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Dropdown, Modal, Form, Checkbox, Tabs } from 'antd';
import { SearchOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { useCreateWorkflow } from '../../../../store/workflow/use-create-workflow';
import { useGetListWfDefinition } from '../../../../store/workflow/use-get-list-wf-definition';
const { Title } = Typography;
const items = [
    {
        key: '1',
        label: (
            <Typography.Text style={{ padding: '15px' }}>
                1st menu item
            </Typography.Text>
        ),
    },
    {
        key: '2',
        label: (
            <Typography.Text style={{ padding: '15px' }}>
                2st menu item
            </Typography.Text>
        ),
    },
];
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, { id, name }) => (
            <>
                <a href={`/admin/workflow/${id}`}>
                    {name} - {id}
                </a>

            </>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }) => (
            <>
                <Tag key={status}>
                    {status}
                </Tag>
            </>
        ),
    },
    {
        title: 'version',
        dataIndex: 'version',
        key: 'version',
    },
    {

        dataIndex: 'operation',
        key: 'operation',
        render: () => (
            <Space size="middle">
                <Dropdown
                    type="primary"
                    size="large"
                    menu={{
                        items,
                    }}
                >
                    <a>
                        <DownOutlined />
                    </a>
                </Dropdown>
            </Space>
        ),
    },
];
const data = [
    {
        id: '1',
        key: '1',
        name: 'Cuộc hội thoại được tạo',
        status: 'Xuất bản',
        count: 1

    },
    {
        id: '2',
        key: '2',
        name: 'Tải lên - Báo cáo TCKT',
        status: 'Xuất bản',
        count: 0
    },
    {
        id: '3',
        key: '3',
        name: 'Tải lên - Báo cáo QTKD',
        status: 'Nháp',
        count: 3
    },

];
export const ListWorkflowDefinition = () => {


    const [createWorkflowData, requestCreateWorkflow] = useCreateWorkflow();
    const [listWfDefinitionRequestData, requestGetListWfDefinitionData] = useGetListWfDefinition();
    const [listWfDefinition, setListWfDefinition] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);

        requestCreateWorkflow(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (createWorkflowData !== null) {
            if (createWorkflowData.state === REQUEST_STATE.SUCCESS) {

                // navigate(`/admin/workflow/${createWorkflowData.data.definitionId}`);
            } else if (createWorkflowData.state === REQUEST_STATE.ERROR) {

            } else if (createWorkflowData.state === REQUEST_STATE.REQUEST) {

            }
        }
    }, [createWorkflowData])

    useEffect(() => {
        if (listWfDefinitionRequestData !== null) {
            if (listWfDefinitionRequestData.state === REQUEST_STATE.SUCCESS) {
                let index = 0;
                var listData = listWfDefinitionRequestData.data.map(x=>{
                    index = index+1;
                    return {
                        id: x.definitionId,
                        key :  x.definitionId,
                        status:"publish",
                        name : x.name,
                        version : x.version
                    }
                });
                // console.log("listData",listData)
                setListWfDefinition(listData);
            } else if (listWfDefinitionRequestData.state === REQUEST_STATE.ERROR) {

            } else if (listWfDefinitionRequestData.state === REQUEST_STATE.REQUEST) {

            }
        }
    }, [listWfDefinitionRequestData])
    
    
    useEffect(()=>{
        requestGetListWfDefinitionData({});
    },[])
    useEffect(()=>{
        console.log("listWfDefinition",listWfDefinition)
    },[listWfDefinition])
    return (

        <>
            <Row style={{padding:"20px"}}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách Workflow Definition</Title>
                        <div>
                            <Button onClick={showModal} icon={<PlusOutlined />} type="primary" size="large">Tạo workflow</Button>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên, email hoặc số điện thoại" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    {listWfDefinition && 
                        <Table columns={columns} dataSource={listWfDefinition} />
                    }  
                </Col>
            </Row>
            <Modal title="Tạo flow mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên Workflow"
                        name="name"

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>

    );
}

