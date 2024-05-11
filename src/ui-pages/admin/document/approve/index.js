import { useEffect, useState } from 'react';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Col, Input, Row, Table, Typography, Tag, Spin, Modal, Button, Pagination, message, notification } from 'antd';
import { SearchOutlined, DeleteOutlined, ShareAltOutlined, EyeOutlined } from '@ant-design/icons';
import { useGetListApprove } from '../../../../store/approve/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
import moment from 'moment';
import { StepImport } from './step';
import { useGetWorkflowActivity } from '../../../../store/workflow/use-wf-activity';
import TextArea from 'antd/lib/input/TextArea';
import { useGetCurrentStepWf } from '../../../../store/workflow/use-get-current-step-wf';
import { useExecuteWfPeding } from '../../../../store/workflow/use-execute-wf';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
const { Title } = Typography;


export const ListApprove = () => {
    const columns = [

        {
            title: 'Người tạo',
            key: 'createdByName',
            dataIndex: 'createdByName',
            render: (_, { createdByName }) => (
                <>
                    {createdByName && <div>{createdByName}</div>}
                </>
            ),
        },
        {
            title: 'Mẫu nhập',
            key: 'importTemplateName',
            dataIndex: 'importTemplateName',
            render: (_, { importTemplateName }) => (
                <>
                    {importTemplateName && <div>{importTemplateName}</div>}
                </>
            ),
        },
        {
            title: 'File nhập',
            key: 'fileId',
            dataIndex: 'fileId',
            render: (_, { fileId }) => (
                <>
                    {fileId && <Typography.Link href={`http://localhost:5000/Api/FileStorage/Get/${fileId}`} >Tải xuống</Typography.Link>}
                </>
            ),
        },
        {
            title: 'Ngày tạo',
            key: 'createdTime',
            dataIndex: 'createdTime',
            render: (_, { createdTime }) => (
                <>
                    {createdTime && <Typography.Text >{moment(new Date(createdTime)).format('DD-MM-YYYY HH:mm')}</Typography.Text>}
                </>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => {
                let color = "";
                let text = "";
                if (status === "PENDING") {
                    text = "Chờ phê duyệt";
                    color = "geekblue";
                }
                if (status === "APPROVE") {
                    text = "Đã phê duyệt";
                    color = "green";
                }
                if (status === "REJECT") {
                    text = "Đã từ chối";
                    color = "red";
                }

                return (
                    <Tag color={color} key={status}>
                        {text}
                    </Tag>
                );
            },
        },

        {
            title: '',
            key: 'action',
            dataIndex: 'action',
            render: (_, data) => (
                <>
                    {/* {console.log("JKey", key)} */}
                    <Row gutter={[10, 20]}>

                        <Col >
                            <ShareAltOutlined onClick={() => { showWorkflowDetail(data) }} className='import_teamplate_action_icon' style={{ cursor: 'pointer', color: 'green' }} />
                            <EyeOutlined className='import_teamplate_action_icon' style={{ cursor: 'pointer' }} />
                            <DeleteOutlined className='import_teamplate_action_icon' style={{ cursor: 'pointer', color: 'red' }} />
                        </Col>
                    </Row>



                </>
            ),
        },
    ];

    const [workflowActivityData, requestGetWorkflowActivityApi] = useGetWorkflowActivity();
    const [currentStepWf, requestGetCurrentStepWfApi] = useGetCurrentStepWf();
    const [executeWfData, requestExecuteWfPending] = useExecuteWfPeding();

    const [listApproveApiData, requestListApproveApi] = useGetListApprove();
    const [listApprove, setListApprove] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalReject, setIsModalRejectOpen] = useState(false);
    const [dataApprove, setDataApprove] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [rejectReason, setRejectReason] = useState("");
    const [isEnd, setIsEnd] = useState(null);
    useEffect(() => {

        requestListApproveApi({
            page: currentPage
        });
    }, [])


    useEffect(() => {
        if (listApproveApiData !== null) {
            if (listApproveApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                // console.log("listImportTemplateApiData.state",listImportTemplateApiData.data);
                var data = listApproveApiData.data.items.map(x => {
                    return {
                        createdTime: x.createdTime,
                        importTemplateName: x.importTemplateName,
                        createdByName: x.createdByName,
                        key: x.id,
                        status: x.status,
                        fileId: x.fileId

                    }
                });
                setTotal(listApproveApiData.data.totalCount);
                setCurrentPage(listApproveApiData.data.pageIndex)
                setListApprove(data);

            } else if (listApproveApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (listApproveApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [listApproveApiData])


    useEffect(() => {
        if (workflowActivityData !== null) {
            if (workflowActivityData.state === REQUEST_STATE.SUCCESS) {
                setLoadingModal(false);
               
                if (workflowActivityData.data.activities.length === workflowActivityData.data.actionLogs.length) {
                    setIsEnd(true);
                } else {
                    setIsEnd(false);
                }

            } else if (workflowActivityData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (workflowActivityData.state === REQUEST_STATE.REQUEST) {
                setLoadingModal(true);
            }
        }
    }, [workflowActivityData])
    useEffect(() => {
        if (currentStepWf !== null) {
            if (currentStepWf.state === REQUEST_STATE.SUCCESS) {
                setLoadingModal(false);

            } else if (currentStepWf.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (currentStepWf.state === REQUEST_STATE.REQUEST) {
                setLoadingModal(true);
            }
        }
    }, [currentStepWf])
    useEffect(() => {
        if (executeWfData !== null) {
            if (executeWfData.state === REQUEST_STATE.SUCCESS) {

                setLoadingModal(false);
                setIsModalOpen(false);
                setIsModalRejectOpen(false);
                setIsEnd(null);

                notification.success({
                    message: 'Đã thao tác thành công',
                });

            } else if (executeWfData.state === REQUEST_STATE.ERROR) {
                notification.success({
                    message: 'Đã gặp phải lỗi, vui lòng liên hệ quản trị viên',
                });
            } else if (executeWfData.state === REQUEST_STATE.REQUEST) {
                setLoadingModal(true);
            }
        }
    }, [executeWfData])
    const showWorkflowDetail = (data) => {
        requestGetWorkflowActivityApi({ fileId: data.fileId })
        requestGetCurrentStepWfApi({ fileId: data.fileId })
        setDataApprove(data);
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsEnd(null);
        setIsModalOpen(false);
    };
    const handleRejectCancel = () => {
        setIsModalRejectOpen(false);
    };

    const onChange = (page) => {

        setCurrentPage(page);
        requestListApproveApi({
            page: page
        });
    };
    const onReject = () => {
        setIsModalRejectOpen(true);

    }
    const onConfirmReject = (activity, workflowInstanceId) => {
        setIsModalRejectOpen(false);
        requestExecuteWfPending({
            WorkflowInstanceId: workflowInstanceId,
            ActivityId: activity.activityId,
            Signal: activity.signal,
            RejectReason: rejectReason
        });
    }

    const onApprove = (activity, workflowInstanceId) => {
        requestExecuteWfPending({
            WorkflowInstanceId: workflowInstanceId,
            ActivityId: activity.activityId,
            Signal: activity.signal,
            RejectReason: rejectReason
        });
    }
    const onRejectReason = (e) => {
        setRejectReason(e.target.value);
    }
    const statusEnd = (
        <div style={{ border: "1px solid green", borderRadius: "5px", padding: "3px", backgroundColor: "green", color: '#fff' }}>Đã kết thúc</div>
    )
    const statusProcess = (
        <div style={{ border: "1px solid blue", borderRadius: "5px", padding: "3px", backgroundColor: "blue", color: '#fff' }}>Đang thực hiện</div>
    )


    return (
        <>
            <AdminCommomLayout>
                <Row style={{ padding: '20px' }}>
                    <Col span={24}>
                        <div className='header_list_users'>
                            <Title level={5}>Danh sách dữ liệu phê duyệt</Title>
                        </div>
                    </Col>
                
                    <Col span={24}>
                        <div className='table'>
                            <Row className='table_filter' gutter={[15,0]}>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Người tạo
                                    </div>
                                    <Input size="small" placeholder="Tìm kiếm theo tên"/>

                                </Col>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Mẫu nhập
                                    </div>
                                    <Input  size="small" placeholder="Tìm kiếm theo email" />

                                </Col>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Trạng thái
                                    </div>
                                    <Input size="small" placeholder="Tìm kiếm theo số điện thoại"  />

                                </Col>
                                
                                <Col span={4} style={{display: "flex", alignItems:'end', gap:'10px'}}>
                                <Button size='small' type='primary'>Lọc</Button>
                                    <Button size='small'>Clear bộ lọc</Button>
                                </Col>
                            </Row>
                            <Table scroll={{y:600}} className='table_data' size="middle" pagination={false} loading={loading} columns={columns} dataSource={listApprove} />

                            <div className='table_paging'>
                                <div><b>Tổng số : {total}</b></div>
                                <Pagination style={{ marginTop: '10px' }} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />

                            </div>
                        </div>
                    </Col>
                </Row>
                <Modal title={"Phê duyệt tài liệu"} open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Spin size="large" spinning={loadingModal}>
                        {dataApprove && <div>
                            <span><b>Quy trình : {`${dataApprove.importTemplateName}`}</b></span>

                        </div>
                        }
                        {isEnd != null && <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '5px' }}><b>Trạng thái : </b> <div>{isEnd ? statusEnd : statusProcess}</div></div>}
                        {workflowActivityData.state === REQUEST_STATE.SUCCESS && workflowActivityData.data.activities.map(x => {
                            return <StepImport setIsEnd={setIsEnd} activity={x} actionLogs={workflowActivityData.data.actionLogs}></StepImport>
                        })}


                        <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>

                            {
                                currentStepWf.state === REQUEST_STATE.SUCCESS && currentStepWf.data.activities.map(x => {
                                    if (x.type === "Approve") {
                                        return (<Button type="primary" onClick={() => { onApprove(x, currentStepWf.data.workflowInstanceId) }} style={{ background: "green", borderColor: "green" }}>
                                            Phê duyệt
                                        </Button>)
                                    }
                                    if (x.type === "Reject") {
                                        return (
                                            <>
                                                <Button type="primary" onClick={() => { onReject(x, currentStepWf.data.workflowInstanceId) }} style={{ background: "red", borderColor: "red" }}> Từ chối</Button>
                                                <Modal size="small" title={"Lý do từ chối"} open={isModalReject} onCancel={handleRejectCancel} footer={null}>
                                                    <TextArea onChange={onRejectReason} placeholder="Nhập lý do từ chối" rows={4} />
                                                    <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'end', gap: '10px' }}>
                                                        <Button type="primary" onClick={() => { onConfirmReject(x, currentStepWf.data.workflowInstanceId) }} style={{ background: "red", borderColor: "red" }}>
                                                            Từ chối
                                                        </Button>

                                                    </div>
                                                </Modal>
                                            </>

                                        )
                                    }
                                })
                            }


                        </div>
                    </Spin>
                </Modal>


            </AdminCommomLayout>
        </>

    );
}

