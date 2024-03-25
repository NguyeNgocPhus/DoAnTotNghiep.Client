import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Dropdown, Modal, Form, Checkbox } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { SearchOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useCreateWorkflow } from '../../../store/workflow/use-create-workflow';
import { REQUEST_STATE } from '../../../app-config/constants';
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
export const ListWorkflow = () => {

  const navigate = useNavigate();

  // const navigateTo = () => navigate('/admin/workflow/create');
  const [createWorkflowData, requestCreateWorkflow] = useCreateWorkflow();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    navigate('/admin/workflow/create');
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
    console.log("createWorkflowData", createWorkflowData);
    if (createWorkflowData !== null) {
      if (createWorkflowData.state === REQUEST_STATE.SUCCESS) {
        
        navigate(`/admin/workflow/${createWorkflowData.data.definitionId}`);
      }else if(createWorkflowData.state === REQUEST_STATE.ERROR){

      }else if(createWorkflowData.state === REQUEST_STATE.REQUEST){

      }
    }
  }, [createWorkflowData])
  return (
    <AdminCommomLayout>
      <Row style={{ padding: '20px' }} gutter={[0, 32]}>
        <Col span={24}>
          <div className='header_list_users'>
            <Title level={5}>Danh sách Workflow</Title>
            <div>
              <Button onClick={showModal} icon={<PlusOutlined />} type="primary" size="large">Tạo workflow</Button>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên, email hoặc số điện thoại" prefix={<SearchOutlined />} />
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
      <Modal title="Tạo flow mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          w
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

    </AdminCommomLayout>

  );
}

