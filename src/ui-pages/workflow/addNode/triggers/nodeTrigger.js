import { Comment, Row, Tabs } from "antd";
import { DiffTwoTone } from '@ant-design/icons';
import "./styles.css";
export const NodeTrigger = ({ trigger }) => {

    const onClickNodeTrigger = () =>{
        console.log("")
    }
    return (
        <>
           
            
            <Comment
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