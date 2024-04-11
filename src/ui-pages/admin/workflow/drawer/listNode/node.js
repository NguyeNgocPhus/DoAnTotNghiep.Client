import { Comment, Row, Tabs } from "antd";
import { DownCircleTwoTone } from '@ant-design/icons';
import "./styles.css";
import { ApproveIcon } from "../../nodes/icons/approve_icon";
import { RejectIcon } from "../../nodes/icons/reject_icon";
import { BranchIcon } from "../../nodes/icons/branch_icon";
import { SendEmailIcon } from "../../nodes/icons/send_email_icon";
import { FileUploadIcon } from "../../nodes/icons/file_upload_icon";
import { ConditionIcon } from "../../nodes/icons/condition_icon";
import { CronIcon } from "../../nodes/icons/cron_icon";
import { FinishIcon } from "../../nodes/icons/finish_icon";

export const Node = ({ node }) => {
    
    let avatar = (
        <DownCircleTwoTone style={{ fontSize: '36px', height: '100%' }} />
    );
    switch (node.key) {
        case "Approve":
            avatar = (
                <ApproveIcon style={{ fontSize: '36px', height: '100%' }} />
            );

            break;
        case "Cron":
            avatar = (
                <CronIcon style={{ fontSize: '36px', height: '100%' }} />
            );
            break;
        case "Reject":
            avatar = (
                <RejectIcon style={{ fontSize: '36px', height: '100%' }} />
            );
            break;
        case "Condition":
            avatar = (
                <ConditionIcon style={{ fontSize: '36px', height: '100%' }} />
            );
            break;
        case "Branch":
            avatar = (
                <BranchIcon style={{ fontSize: '36px', height: '100%' }} />
            );
            break;
        case "SendEmail":
            avatar = (
                <SendEmailIcon style={{ fontSize: '36px', height: '100%' }} />
            );
            break;
        case "FileUpload":
            avatar = (
                <FileUploadIcon style={{ fontSize: '36px', height: '100%' }} />
            );
            break;
            case "Finish":
                avatar = (
                    <FinishIcon style={{ fontSize: '36px', height: '100%' }} />
                );
                break;
        default:

    }
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
                onDragStart={(event) => onDragStart(event, node.key, node.name, node.description)} 
                draggable
                onClick={onClickNodeTrigger}
                author={<b>{node.name}</b>}
                avatar={avatar}
                content={
                    <p style={{ fontSize: '12px' }}>
                        {node.description}
                    </p>
                }
            />
        </>
    );
}