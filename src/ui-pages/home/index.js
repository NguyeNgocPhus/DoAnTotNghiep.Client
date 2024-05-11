import "./styles.css";
import 'reactflow/dist/style.css';
import { AdminCommomLayout } from "../common/layout/admin/admin-common";
import { Line } from '@ant-design/charts';
import { Col, Row, Typography } from "antd";
export const HomePage = () => {

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
      <div style={{position:'absolute', top:"50%", left:'40%'}}>
        <Typography.Title>HỆ THỐNG QUẢN TRỊ</Typography.Title> 
      </div >


    </AdminCommomLayout>

  );
}

