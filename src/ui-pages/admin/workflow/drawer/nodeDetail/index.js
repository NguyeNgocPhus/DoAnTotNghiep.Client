import { Drawer, Tabs } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import "./styles.css";
export const NodeDetailDrawer = ({ open, data, onClose }) => {
    console.log("data",data)
    const operations = <CloseCircleOutlined size='large' onClick={onClose} />;
    return (
        <>
            <Drawer placement="left" getContainer={false} mask={false} closable={false} open={open}>

                <Tabs tabBarExtraContent={operations} defaultActiveKey="1">
                    <Tabs.TabPane tab="Trigger" key="1">
                      <div>Node : {data?.data?.name}</div> 
                      <div>Id : {data?.id}</div> 
                    </Tabs.TabPane>

                </Tabs>

            </Drawer>
        </>
    );
}