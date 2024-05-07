import { useEffect, useState } from 'react';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Col, Input, Row, Table, Typography, Tag, Spin, Modal, Button } from 'antd';
import { ClockCircleFilled, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useGetListApprove } from '../../../../store/approve/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
import moment from 'moment';
const { Title } = Typography;


export const StepImport = ({ activity, actionLogs }) => {
    let step = {
        name: "",
        type: "",
        createdByName: "",
        createdTime: "",
        msg: null,
        executed: false
    };

    var activities = activity;

    activities.forEach(at => {

        var actionLog = actionLogs.find(x => at.type === x.activityName);
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
                step.name = "Từ chối"
            }
        } else {
            step.msg = "Chờ phê duyệt";
        }

    })
   
    const colorBorder = step.executed ? (step.type !== "REJECT" ? "green" :"red") : "smoke";
    return (
        <>

            <div className={`step ${colorBorder}`}>
                {step.executed && <>
                    <div className='icon_step'>
                        <ClockCircleFilled style={{ fontSize: '20px', color: 'green' }} />
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
                    </div>
                </>}
                {
                    !step.executed && <div><b>{step.msg}</b></div>
                }
            </div>


        </>

    );
}

