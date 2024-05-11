import "./styles.css";
import 'reactflow/dist/style.css';

import { Line } from '@ant-design/charts';
import { Col, Row, Typography } from "antd";
import { AdminCommomLayout } from "../../common/layout/admin/admin-common";
export const DashBoard = () => {

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
  };
  return (
    <AdminCommomLayout>
      <Row gutter={[0, 40]} style={{padding:'30px'}}>
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
              <div className="count_text">Số quy trình phê duyệt</div>
              <span className="count_number">0</span>
            </Col>
          </Row>

        </Col>
        <Col span={24}>
          <div className="chart">
          <Line {...config} />
          </div>
          
        </Col>
      </Row>


    </AdminCommomLayout>

  );
}

