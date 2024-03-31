import "./styles.css";
import 'reactflow/dist/style.css';
import { Col, Input, Row, Space, Table, Typography, Tag, Dropdown } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
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
        title: 'count',
        dataIndex: 'count',
        key: 'count',
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
export const ListWorkflowInstance = () => {
   
   
    return (

        <>
            <Row style={{padding:'20px'}}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách Workflow Instance</Title>
                        {/* <div>
                            <Button onClick={showModal} icon={<PlusOutlined />} type="primary" size="large">Tạo workflow</Button>
                        </div> */}
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên, email hoặc số điện thoại" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} />
                </Col>
            </Row>
            
        </>

    );
}

