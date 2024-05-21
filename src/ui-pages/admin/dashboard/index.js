import "./styles.css";
import 'reactflow/dist/style.css';

import { Line } from '@ant-design/charts';
import { Col, DatePicker, Row, Spin, Typography } from "antd";
import { AdminCommomLayout } from "../../common/layout/admin/admin-common";
import { useEffect, useState } from "react";
import { useViewDashboard } from "../../../store/auth/use-view-dashboard";
import { REQUEST_STATE } from "../../../app-config/constants";
import moment from "moment";

export const DashBoard = () => {

  const [dateFilter, setDateFilter] = useState(Date.now());
  const [countApprove, setCountApprove] = useState(0);
  const [countReject, setCountReject] = useState(0);
  const [countUpload, setCountUpload] = useState(0);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewDashboardApiData, requestViewDashboardApiData] = useViewDashboard();


  useEffect(() => {
    requestViewDashboardApiData({ date: dateFilter })
  }, [])
  useEffect(() => {
    if (viewDashboardApiData.state === REQUEST_STATE.SUCCESS) {

      var list = [];
      list = list.concat(viewDashboardApiData.data.approves);
      list = list.concat(viewDashboardApiData.data.rejects);
      list = list.concat(viewDashboardApiData.data.uploads);
      console.log(list)
      setListData([...list])
      setCountApprove(viewDashboardApiData.data.countApprove);
      setCountReject(viewDashboardApiData.data.countReject);
      setCountUpload(viewDashboardApiData.data.countUpload);
      setLoading(false);

    } else if (viewDashboardApiData.state === REQUEST_STATE.ERROR) {
      // message.error('This is an error message');
    } else if (viewDashboardApiData.state === REQUEST_STATE.REQUEST) {
      setLoading(true);
    }
  }, [viewDashboardApiData])

  const onChange = (date, dateString) => {

    requestViewDashboardApiData({ date: moment(date).valueOf() })
  };
  return (
    <AdminCommomLayout>
      <Spin spinning={loading}>
        <Row gutter={[0, 20]} style={{ padding: '30px' }}>
          <Col span={24}>
            <Row gutter={[0, 20]} style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>

              <Col span={5} className="dashboad_count">
                <div className="count_text" >Số báo cáo nhập</div>
                <span className="count_number">{countUpload}</span>
              </Col>
              <Col span={5} className="dashboad_count">
                <div className="count_text">Số lượt phê duyệt</div>
                <span className="count_number">{countApprove}</span>
              </Col>
              <Col span={5} className="dashboad_count">
                <div className="count_text">Số lượt từ chối</div>
                <span className="count_number">{countReject}</span>
              </Col>
            </Row>

          </Col>
          <Col span={24} className="chart" style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px", padding: "10px", display: 'flex', justifyContent: 'space-between' }}>
              <b>Biểu đồ thống kê</b>
              <DatePicker format={"DD/MM/YYYY"} defaultValue={moment(new Date(), "DD/MM/YYYY")} size="small" onChange={onChange} />
            </div>
            <div className="chart">

              <Line style={{ lineWidth: 2 }} data={listData} xField={'hour'} yField={'value'} colorField={'category'} height={400} />
            </div>

          </Col>
        </Row>

      </Spin>
    </AdminCommomLayout>

  );
}

