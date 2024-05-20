import "./styles.css";
import 'reactflow/dist/style.css';

import { Line } from '@ant-design/charts';
import { Col, DatePicker, Row, Typography } from "antd";
import { AdminCommomLayout } from "../../common/layout/admin/admin-common";
export const DashBoard = () => {

  const data = [
    { year: '1h', value: 3, category: "người dùng đăng nhập" },
    { year: '2h', value: 4, category: "count_document_upload" },
    { year: '3h', value: 3.5, category: "người dùng đăng nhập" },
    { year: '4h', value: 5, category: "count_workflow" },
    { year: '5h', value: 4.9, category: "count_workflow" },
    { year: '6h', value: 6, category: "người dùng đăng nhập" },
    { year: '7h', value: 7, category: "count_workflow" },
    { year: '8h', value: 9, category: "user_login" },
    { year: '9h', value: 13, category: "count_approve" },
    { year: '10h', value: 13, category: "count_approve" },
    { year: '11h', value: 13, category: "count_approve" },
    { year: '12h', value: 2, category: "count_approve" },
    { year: '13h', value: 13, category: "count_approve" },
    { year: '14h', value: 13, category: "count_approve" },
    { year: '15h', value: 13, category: "count_approve" },
    { year: '16h', value: 13, category: "count_approve" },
    { year: '17h', value: 13, category: "count_approve" },
    { year: '18h', value: 13, category: "count_approve" },
    { year: '19h', value: 13, category: "count_approve" },
    { year: '20h', value: 13, category: "count_approve" },
    { year: '21h', value: 13, category: "count_approve" },
    { year: '22h', value: 13, category: "count_approve" },
    { year: '23h', value: 13, category: "count_approve" },
    
  ];

  const config = {
    data,
    
    xField: 'year',
    yField: 'value',
    colorField: 'category',
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <AdminCommomLayout>
      <Row gutter={[0, 40]} style={{ padding: '30px' }}>
        <Col span={24}>
          <Row gutter={[0, 0]} justify="space-between">
            <Col span={5} className="dashboad_count">
              <div className="count_text">User đăng nhập</div>
              <span className="count_number">0</span>
            </Col>
            <Col span={5} className="dashboad_count">
              <div className="count_text" >Tài liệu upload</div>
              <span className="count_number">0</span>
            </Col>
            <Col span={5} className="dashboad_count">
              <div className="count_text">Số lượt phê duyệt</div>
              <span className="count_number">0</span>
            </Col>
            <Col span={5} className="dashboad_count">
              <div className="count_text">Số lượt từ chối</div>
              <span className="count_number">0</span>
            </Col>
          </Row>

        </Col>
        <Col span={24} className="chart" style={{ padding: "20px" }}>
          <div style={{ marginBottom: "20px", marginTop: "20px", display:'flex', justifyContent:'space-between'}}>
            <b>Biểu đồ thống kê</b>
            <DatePicker size="small" onChange={onChange} />
          </div>
          <div className="chart">

            <Line {...config} />
          </div>

        </Col>
      </Row>


    </AdminCommomLayout>

  );
}

