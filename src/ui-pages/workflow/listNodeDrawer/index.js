import { Drawer, Tabs } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import "./styles.css";
import { ListNodeTrigger } from "./triggers/listNodeTrigger";
import { ListNodeAction } from "./actions/listNodeAction";
export const ListNodeDrawer = ({ open, onClose }) => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const operations = <CloseCircleOutlined size='large' onClick={onClose} />;
    return (
        <>
            <Drawer placement="left" getContainer={false} mask={false} closable={false} open={open}>

                <Tabs tabBarExtraContent={operations} defaultActiveKey="1">
                    <Tabs.TabPane tab="Trigger" key="1">
                        <ListNodeTrigger></ListNodeTrigger>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Hành động" key="2">
                        <ListNodeAction></ListNodeAction>
                    </Tabs.TabPane>

                </Tabs>

            </Drawer>
        </>
    );
}