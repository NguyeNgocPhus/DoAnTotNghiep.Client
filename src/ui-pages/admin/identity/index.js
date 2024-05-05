import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography, Tabs } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { ListRole } from "./role";
import { ListUsers } from "./user";
import { hasRole } from "../../../app-helper/jwtHepler";
const { Title } = Typography;


export const Identity = () => {
  const showRoles = hasRole("Role") || hasRole("SuperAdmin");
  const showUser = hasRole("User") || hasRole("SuperAdmin");
  var tabs = [
    
  ]
  if(showRoles){
    tabs.push({
      label: `Quyền`,
      key: 1,
      children: <ListRole></ListRole>,
    })
  }
  if(showUser){
    tabs.push({
      label: `Người dùng`,
      key: 2,
      children: <ListUsers></ListUsers>,
    })
  }
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

