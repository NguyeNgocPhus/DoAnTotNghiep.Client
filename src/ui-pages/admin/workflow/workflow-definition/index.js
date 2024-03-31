import { useEffect, useState } from 'react';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Dropdown, Modal, Form, message } from 'antd';
import { SearchOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { useCreateWfDefinition } from '../../../../store/workflow/use-create-wf-definition';
import { useGetListWfDefinition } from '../../../../store/workflow/use-get-list-wf-definition';
import { useNavigate } from 'react-router-dom';
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
                <a href={`/admin/workflow-definition/${id}`}>
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

export const ListWorkflowDefinition = () => {

    const navigate = useNavigate();
    const [createWfDefinitionApiData, requestCreateWfDefinitionApiData] = useCreateWfDefinition();
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
        requestCreateWfDefinitionApiData(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (createWfDefinitionApiData !== null) {
            if (createWfDefinitionApiData.state === REQUEST_STATE.SUCCESS) {
                console.log("createWfDefinitionApiData",createWfDefinitionApiData);
                setIsModalOpen(false);
                // message.success('Loading finished', 2.5);
                navigate(`/admin/workflow-definition/${createWfDefinitionApiData.data.definitionId}`)

            } else if (createWfDefinitionApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (createWfDefinitionApiData.state === REQUEST_STATE.REQUEST) {
                // message.loading('Action in progress..', 2.5)
            }
        }
    }, [createWfDefinitionApiData])

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

