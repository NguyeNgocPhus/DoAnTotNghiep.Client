import { Comment, Row, Tabs } from "antd";
import { DownCircleTwoTone } from '@ant-design/icons';
import "./styles.css";

export const Node = ({ node }) => {

    const onClickNodeTrigger = () => {
        console.log("onClickNodeTrigger")
    }
    const onDragStart = (event, nodeType, nodeName, nodeDescription) => {
        event.dataTransfer.setData('type', nodeType);
        event.dataTransfer.setData('name', nodeName);
        event.dataTransfer.setData('description', nodeDescription);
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <>
            <Comment className="dndnode"
                onDragStart={(event) => onDragStart(event, node.key, node.name, node.description)} draggable
                onClick={onClickNodeTrigger}
                author={<b>{node.name}</b>}
                avatar={<DownCircleTwoTone style={{ fontSize: '36px', height: '100%' }} />}
                content={
                    <p style={{ fontSize: '12px' }}>
                        {node.description}
                    </p>
                }
            />
        </>
    );
}