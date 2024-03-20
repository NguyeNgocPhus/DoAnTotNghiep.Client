import { Drawer, Row, Tabs } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import "./styles.css";
import { ListNodeTrigger } from "./triggers/listNodeTrigger";
import { NodeAction } from "./actions/nodeAction";
import { ListNodeAction } from "./actions/listNodeAction";
export const AddNodeDrawer = ({ visibleStore, onCloseStore }) => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const operations = <CloseCircleOutlined size='large' onClick={onCloseStore} />;
    return (
        <>
            <Drawer placement="left" getContainer={false} mask={false} closable={false} open={visibleStore}>

                <Tabs tabBarExtraContent={operations} defaultActiveKey="1">
                    <Tabs.TabPane tab="Trigger" key="1">
                        <ListNodeTrigger></ListNodeTrigger>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Hành động" key="2">
                        <ListNodeAction></ListNodeAction>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Test ne" key="3">
                        <div className="dndflow">
                            <div className="description">You can drag these nodes to the pane on the right.</div>
                            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                                Input Node
                            </div>
                            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                                Default Node
                            </div>
                            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                                Output Node
                            </div>
                        </div>
                    </Tabs.TabPane>

                </Tabs>

            </Drawer>
        </>
    );
}