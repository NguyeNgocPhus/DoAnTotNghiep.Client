import { useEffect, useState } from 'react';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Col, Input, Row, Table, Typography, Tag, Spin, Modal, Button } from 'antd';
import { ClockCircleFilled, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useGetListApprove } from '../../../../store/approve/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
import moment from 'moment';
const { Title } = Typography;


export const StepImport = () => {

    return (
        <>

            <div className='step'>
                <div className='icon_step'>
                    <ClockCircleFilled style={{fontSize:'20px', color: 'green' }} />
                </div>
                <div>
                    <div className='step_info name_step'>
                        <div><b>Tên thao tác :</b> </div>
                        <div>Tải lên dữ liệu</div>
                    </div>
                    <div className='step_info name_handler'>
                        <div><b>Người thực hiện : </b></div>
                        <div>Nguyễn phú</div>
                    </div>
                    <div className='step_info name_handler'>
                        <div><b>Thời gian thực hiện : </b></div>
                        <div>20/4/2024 10:44</div>
                    </div>
                </div>
            </div>
        </>

    );
}

