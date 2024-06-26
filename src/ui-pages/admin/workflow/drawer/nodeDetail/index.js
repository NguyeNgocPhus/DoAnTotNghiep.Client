import { Drawer } from "antd";
import "./styles.css";
import { ApproveDetail } from "./approve";
import { CronDetail } from "./cron";
import { RejectDetail } from "./reject";
import { ConditionDetail } from "./condition";
import { BranchDetail } from "./branch";
import { SendEmailDetail } from "./sendEmail";
import { FileUploadDetail } from "./fileUpload";
import { FinishDetail } from "./finish";
import { UpdateStatusDetail } from "./update_status";
export const NodeDetailDrawer = ({ open, data, onClose, onUpdateNodes }) => {

    let nodeDetail = null;
    switch (data.type) {
        case "Approve":
            nodeDetail = (
                <ApproveDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );

            break;
        case "UpdateStatus":
            nodeDetail = (
                <UpdateStatusDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );

            break;
        case "Cron":
            nodeDetail = (
                <CronDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );
            break;
        case "Reject":
            nodeDetail = (
                <RejectDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );
            break;
        case "Condition":
            nodeDetail = (
                <ConditionDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );
            break;
        case "Branch":
            nodeDetail = (
                <BranchDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );
            break;
        case "SendEmail":
            nodeDetail = (
                <SendEmailDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );
            break;
        case "FileUpload":
            nodeDetail = (
                <FileUploadDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );
            break;
        case "Finish":
            nodeDetail = (
                <FinishDetail onUpdateNodes={onUpdateNodes} data={data} onClose={onClose} />
            );
            break;
        default:

    }
    // console.log("nodeDetail",nodeDetail)
    return (
        <>
            <Drawer width={430} placement="left" getContainer={false} mask={false} closable={false} open={open}>
                {/* <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className='node-info'>
                            <div className='node-image'>
                                <FileUploadIcon></FileUploadIcon>
                            </div>
                            <div className='node-name'>
                                <div htmlFor="text">{data?.type}</div>
                                <Typography.Text>{data?.data?.name}</Typography.Text>
                            </div>

                    
                        </div>
                        <CloseCircleOutlined onClick={onClose} ></CloseCircleOutlined>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <div>TYpe : {data?.type}</div>
                        <div>Id : {data?.id}</div>
                    </Col>

                </Row> */}
                {data.type && nodeDetail}


            </Drawer>
        </>
    );
}