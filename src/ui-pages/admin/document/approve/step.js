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
        executed: false
    };


    step.executed = true;
    step.type = activity.activityName;
    step.createdByName = activity.createdByName;
    step.createdTime = moment(new Date(activity.createdTime)).format('DD-MM-YYYY HH:mm')
    if (activity.activityName === "FileUpload") {
        step.name = "Tải lên dữ liệu"
    }
    if (activity.activityName === "Condition") {
        step.name = "Điều kiện"
    }
    if (activity.activityName === "UpdateStatus") {
        step.name = "Cập nhật trạng thái"
    }
    if (activity.activityName === "Approve") {
        step.name = "Phê duyệt"
    }
    if (activity.activityName === "Reject") {
        step.name = "Từ chối";
        step.rejectReason = activity.actionReason;
    }
    if (activity.activityName === "Finish") {
        step.name = "Kết thúc quy trình";
        
    }

    const colorBorder = step.executed ? (step.type !== "Reject" ? "green" : "red") : "smoke";
    if (step.type === "Reject")
        setIsEnd(true);
    return (
        <>

            <div className={`step ${colorBorder}`}>
                {activity.activityName !== "Finish" && <>
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
                    activity.activityName === "Finish" && <div style={{ margin: '0 auto' }}><b>{step.name}</b></div>
                }

            </div>


        </>

    );
}

