import { Comment, Row, Tabs } from "antd";
import { DiffTwoTone } from '@ant-design/icons';
import "./styles.css";
export const NodeTrigger = ({ node }) => {

    const onClickNodeTrigger = () =>{
        console.log("")
    }
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('type-node', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    return (
        <>
           
            
            <Comment className="dndnode"
                onDragStart={(event) => onDragStart(event, node.key)} draggable  
                onClick={onClickNodeTrigger}
                author={<b>{node.name}</b>}
                avatar={<DiffTwoTone  style={{ fontSize: '36px',height:'100%' }}/>}
                content={
                    <p style={{ fontSize: '12px' }}>
                       {node.description}
                    </p>
                }
                
            />
        </>
    );
}