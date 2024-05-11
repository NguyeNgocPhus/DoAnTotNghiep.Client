import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography } from 'antd';
import { ClockCircleFilled } from '@ant-design/icons';
import moment from 'moment';
const { Title } = Typography;


export const StepImport = ({ activity, actionLogs , setIsEnd}) => {
    let step = {
        name: "",
        type: "",
        createdByName: "",
        createdTime: "",
        rejectReason:"",
        msg: null,
        executed: false
    };

    var activities = activity;

    activities.forEach(at => {
        var actionLog = actionLogs.find(x => at.activityId === x.activityId);
        if (actionLog !== undefined) {
            step.executed = true;
            step.type = actionLog.activityName;
            step.createdByName = actionLog.createdByName;
            step.createdTime = moment(new Date(actionLog.createdTime)).format('DD-MM-YYYY HH:mm')
            if (actionLog.activityName === "FileUpload") {
                step.name = "Tải lên dữ liệu"
            }
            if (actionLog.activityName === "Approve") {
                step.name = "Phê duyệt"
            }
            if (actionLog.activityName === "Reject") {
                step.name = "Từ chối";
                step.rejectReason = actionLog.actionReason;
            }
        } else {
            step.msg = at.description;
        }

    })
    
    const colorBorder = step.executed ? (step.type !== "Reject" ? "green" : "red") : "smoke";
    if(step.type === "Reject")
        setIsEnd(true);
    return (
        <>

            <div className={`step ${colorBorder}`}>
                {step.executed && <>
                    <div className='icon_step'>
                        <ClockCircleFilled style={{ fontSize: '20px', color: `${step.type === "Reject" ? "red" : "green"}` }} />
                    </div>
                    <div>

                        <div className='step_info name_step'>
                            <div><b>Tên thao tác :</b> </div>
                            <div>{step.name}</div>
                        </div>
                        <div className='step_info name_handler'>
                            <div><b>Người thực hiện : </b></div>
                            <div>{step.createdByName}</div>
                        </div>
                        <div className='step_info name_handler'>
                            <div><b>Thời gian thực hiện : </b></div>
                            <div>{step.createdTime}</div>
                        </div>
                        {
                            step.type === "Reject" && (<div className='step_info name_handler'>
                                <div><b>Lý do từ chối : </b></div>
                                <div>{step.rejectReason}</div>
                            </div>)
                        }
                    </div>
                </>}
                {
                    !step.executed && <div><b>{step.msg}</b></div>
                }

            </div>
           

        </>

    );
}

