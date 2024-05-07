import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Space, Typography, Tag, Dropdown, Tabs } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ListWorkflowDefinition } from './workflow-definition';
import { ListWorkflowInstance } from './workflow-instance';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
const { Title } = Typography;

var tabs = [
  {
    label: `Workflow Definition`,
    key: 1,
    children: <ListWorkflowDefinition></ListWorkflowDefinition>,
  }
  // ,
  // {
  //   label: `Workflow Instance`,
  //   key: 2,
  //   children: <ListWorkflowInstance></ListWorkflowInstance>,
  // }
]
export const Workflow = () => {

  
  return (
    <AdminCommomLayout>
      {/* <Row style={{ padding: '20px' }} gutter={[0, 32]}>
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
      </Row> */}
      <Tabs 
        style={{height:'100vh',
        paddingTop: "20px"}}
        tabPosition={"left"}
        items={tabs}
      />
      {/* <Modal title="Tạo flow mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
      </Modal> */}

    </AdminCommomLayout>

  );
}

