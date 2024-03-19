import { Comment, Row, Tabs } from "antd";
import { DownCircleTwoTone } from '@ant-design/icons';
import "./styles.css";

export const NodeAction = ({ action }) => {

    const onClickNodeTrigger = () =>{
        console.log("onClickNodeTrigger")
    }
    return (
        <>
           
            
            <Comment
                onClick={onClickNodeTrigger}
                author={<b>{action.name}</b>}
                avatar={<DownCircleTwoTone  style={{ fontSize: '36px',height:'100%' }}/>}
                content={
                    <p style={{ fontSize: '12px' }}>
                       {action.description}
                    </p>
                }
                
            />
        </>
    );
}