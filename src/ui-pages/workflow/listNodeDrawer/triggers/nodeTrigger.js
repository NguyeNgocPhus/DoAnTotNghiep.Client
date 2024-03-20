import { Comment, Row, Tabs } from "antd";
import { DiffTwoTone } from '@ant-design/icons';
import "./styles.css";
export const NodeTrigger = ({ trigger }) => {

    const onClickNodeTrigger = () =>{
        console.log("")
    }
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    return (
        <>
           
            
            <Comment className="dndnode"
                onDragStart={(event) => onDragStart(event, 'default')} draggable  
                onClick={onClickNodeTrigger}
                author={<b>{trigger.name}</b>}
                avatar={<DiffTwoTone  style={{ fontSize: '36px',height:'100%' }}/>}
                content={
                    <p style={{ fontSize: '12px' }}>
                       {trigger.description}
                    </p>
                }
                
            />
        </>
    );
}