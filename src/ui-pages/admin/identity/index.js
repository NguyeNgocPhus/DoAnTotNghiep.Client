import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography, Tabs } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { ListRole } from "./role";
import { ListUsers } from "./user";
const { Title } = Typography;

var tabs = [
  {
    label: `Nhóm người dùng`,
    key: 1,
    children: <ListRole></ListRole>,
  },
  {
    label: `Người dùng`,
    key: 2,
    children: <ListUsers></ListUsers>,
  }
]
export const Identity = () => {

  
  return (
    <AdminCommomLayout>
      <Tabs 
        style={{height:'100vh',
        paddingTop: "20px"}}
        tabPosition={"left"}
        items={tabs}
      />

    </AdminCommomLayout>

  );
}

