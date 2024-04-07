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
export const NodeDetailDrawer = ({ open, data, onClose }) => {
    
    let nodeDetail ;
    switch (data.type) {
        case "Approve":
            nodeDetail = (
                <ApproveDetail data={data} onClose={onClose}/>
            );

            break;
        case "Cron":
            nodeDetail = (
                <CronDetail  data={data}  onClose={onClose}/>
            );
            break;
        case "Reject":
            nodeDetail = (
                <RejectDetail  data={data}  onClose={onClose}/>
            );
            break;
        case "Condition":
            nodeDetail = (
                <ConditionDetail  data={data}  onClose={onClose}/>
            );
            break;
        case "Branch":
            nodeDetail = (
                <BranchDetail  data={data}  onClose={onClose}/>
            );
            break;
        case "SendEmail":
            nodeDetail = (
                <SendEmailDetail  data={data}  onClose={onClose}/>
            );
            break;
        case "FileUpload":
            nodeDetail =(
                <FileUploadDetail  data={data}  onClose={onClose}/>
            );
            break;
        case "Finish":
            nodeDetail =(
                <FinishDetail  data={data}  onClose={onClose}/>
            );
            break;
        default:

    }
    // console.log("nodeDetail",nodeDetail)
    return (
        <>
            <Drawer placement="left" getContainer={false} mask={false} closable={false} open={open}>
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
                {data && nodeDetail}


            </Drawer>
        </>
    );
}