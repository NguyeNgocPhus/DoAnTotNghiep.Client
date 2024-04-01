import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography } from 'antd';
import { AdminCommomLayout } from "../common/layout/admin/admin-common";
const { Title } = Typography;

export const HomePage = () => {

  
  return (
    <AdminCommomLayout>
      <Typography.Text>HOME PAGE ADMIN</Typography.Text>

    </AdminCommomLayout>

  );
}

