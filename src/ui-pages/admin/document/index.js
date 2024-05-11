import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography, Tabs } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { ListDocument } from './list';
import { ListApprove } from './approve';
const { Title } = Typography;

var tabs = [
  {
    label: `Mẫu nhập`,
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
    
        <ListDocument></ListDocument>

    </AdminCommomLayout>

  );
}

