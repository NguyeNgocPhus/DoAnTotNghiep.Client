import "./styles.css";
import 'reactflow/dist/style.css';
import { Typography } from 'antd';
import { ClockCircleFilled } from '@ant-design/icons';
import moment from 'moment';
const { Title } = Typography;


export const StepImport = ({ activity, actionLogs, setIsEnd }) => {
    let step = {
        name: "",
        type: "",
        createdByName: "",
        createdTime: "",
        rejectReason: "",
        msg: null,
        executed: false,
        isEnd: false,
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
            if (actionLog.activityName === "UpdateStatus") {
                if(actionLog.data !== undefined && actionLog.data !== null && actionLog.data !== "" ){
                    const data = JSON.parse(actionLog.data);
                    const status = data.status;
                    if(status === "Approve"){
                        step.msg = "Phê duyệt"
                    }
                    if(status === "Reject"){
                        step.msg = "Từ chối";
                    }
                }
                
                step.name = "Cập nhật trạng thái"
            }
            if (actionLog.activityName === "Finish") {
                step.name = "Kết thúc quy trình"
                step.isEnd = true;
            }
            if (actionLog.activityName === "Condition") {
                step.name = "Kiểm tra điều kiện"
                if(actionLog.data === "True"){
                    step.msg = "Thoả mãn"
                }
                if(actionLog.data === "False"){
                    step.msg = "Không thoả mãn"
                }
            }
            if (actionLog.activityName === "Approve") {
                step.name = "Phê duyệt"
            }
            if (actionLog.activityName === "Reject") {
                step.name = "Từ chối";
                step.rejectReason = actionLog.actionReason;
            }
        } else if (at.type === "Approve" || at.type == "Reject") {
           
            step.msg = at.description;
            
        }

    })

    const colorBorder = step.executed ? (step.type !== "Reject" ? "green" : "red") : "smoke";
    if (step.type === "Reject")
        setIsEnd(true);
    return (
        <>
            {step.executed &&  !step.isEnd &&<>
                <div className={`step ${colorBorder}`}>

                    <div className='icon_step'>
                        <ClockCircleFilled style={{ fontSize: '20px', color: `${step.type === "Reject" ? "red" : "green"}` }} />
                    </div>
                    <div>

                        <div className='step_info name_step'>
                            <div><b>Tên thao tác :</b> </div>
                            <div>{step.name}</div>
                        </div>
                        {
                            step.type === "Condition" && (<div className='step_info name_handler'>
                            <div><b>Kiểm tra : </b></div>
                            <div>{step.msg}</div>
                            </div>)
                        }
                         {
                            step.type === "UpdateStatus" && (<div className='step_info name_handler'>
                            <div><b>Trạng thái cập nhật : </b></div>
                            <div>{step.msg}</div>
                            </div>)
                        }
                        <div className='step_info name_handler'>
                            <div><b>Người thực hiện : </b></div>
                            <div>{step.createdByName !== "SYSTEM" ? step.createdByName :"Hệ thống" }</div>
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


                </div>
            </>
            }
            {
                !step.executed && !step.isEnd &&  step.msg &&
                <div className={`step ${colorBorder}`}>
                    <div><b>{step.msg}</b></div>

                </div>
            }{
                step.isEnd &&
                <div style={{textAlign:'center'}}><b>--- {step.name} ---</b></div>
            }



        </>

    );
}