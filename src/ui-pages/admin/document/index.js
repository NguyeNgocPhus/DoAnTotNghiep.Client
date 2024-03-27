import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography, Tabs } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { ListDocument } from './upload';
import { ListApprove } from './approve';
const { Title } = Typography;

var tabs = [
  {
    label: `Danh sách mẫu nhập`,
    key: 1,
    children: <ListDocument></ListDocument>,
  },
  {
    label: `Phê duyệt dữ liệu`,
    key: 2,
    children: <ListApprove></ListApprove>,
  }
]
export const Document = () => {

  
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
        style={{height:'100vh'}}
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

