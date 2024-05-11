import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Upload, Spin, Pagination } from 'antd';
import { SearchOutlined, ShareAltOutlined, CheckOutlined, EditOutlined, UploadOutlined, HistoryOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetListImportTemplate } from '../../../../store/import-template/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { useCreateImportTemplate } from '../../../../store/import-template/use-create-import-template';
import { useDeleteImportTemplate } from '../../../../store/import-template/use-delete-import-template';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { useGetListApprove } from '../../../../store/approve/use-get-list-import-template';
import moment from 'moment';
import { useGetImportTemplate } from '../../../../store/import-template/use-get-import-template';
import { StepImport } from '../approve/step';
import { useGetWorkflowActivity } from '../../../../store/workflow/use-wf-activity';
const { Title } = Typography;

export const History = () => {
    const columns = [

        {
            title: 'Người nhập liệu',
            key: 'createdByName',
            dataIndex: 'createdByName',
            render: (_, { createdByName }) => (
                <>
                    {createdByName && <div>{createdByName}</div>}
                </>
            ),
        },
        // {
        //     title: 'Mẫu nhập',
        //     key: 'importTemplateName',
        //     dataIndex: 'importTemplateName',
        //     render: (_, { importTemplateName }) => (
        //         <>
        //             {importTemplateName && <div>{importTemplateName}</div>}
        //         </>
        //     ),
        // },
        {
            title: 'File đã tải lên',
            key: 'fileId',
            dataIndex: 'fileId',
            render: (_, { fileId }) => (
                <>
                    {fileId && <Typography.Link href={`http://localhost:5000/Api/FileStorage/Get/${fileId}`} >Tải xuống</Typography.Link>}
                </>
            ),
        },
        {
            title: 'Ngày nhập liệu',
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
                            {/* <ShareAltOutlined onClick={() => { showWorkflowDetail(data) }} className='import_teamplate_action_icon' style={{ cursor: 'pointer', color: 'green' }} /> */}
                            <Button onClick={() => { showWorkflowDetail(data) }} type='primary'>Lịch sử phê duyệt</Button>
                        </Col>
                    </Row>



                </>
            ),
        },
    ];

    const { id } = useParams()
    const [listHistoryApiData, requestListHistoryApi] = useGetListApprove();
    const [importTemplateApiData, requestImportTemplateApi] = useGetImportTemplate();
    const [workflowActivityData, requestGetWorkflowActivityApi] = useGetWorkflowActivity();

    const [historyOpen, setHistoryOpen] = useState(false);
    const [dataHistory, setDataHistory] = useState(null);
    const [listHistory, setListHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [isEnd, setIsEnd] = useState(null);
    const [fileTemplateId, setFileTemplateId] = useState(null);
    const [importTemplateId, setImportTemplateId] = useState(null);


    useEffect(() => {
        requestListHistoryApi({ importTemplateId: id });
        requestImportTemplateApi({ id });
    }, [])
    useEffect(() => {
        if (listHistoryApiData !== null) {
            if (listHistoryApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                console.log("llistHistoryApiData", listHistoryApiData);
                var data = listHistoryApiData.data.items.map(x => {
                    return {
                        createdTime: x.createdTime,
                        importTemplateName: x.importTemplateName,
                        createdByName: x.createdByName,
                        key: x.id,
                        status: x.status,
                        fileId: x.fileId

                    }
                });
                setTotal(listHistoryApiData.data.totalCount);
                setCurrentPage(listHistoryApiData.data.pageIndex)
                setListHistory(data);
            } else if (listHistoryApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (listHistoryApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [listHistoryApiData])
    useEffect(() => {
        if (importTemplateApiData !== null) {
            if (importTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                // console.log("importTemplateApiData",importTemplateApiData.data)

            } else if (importTemplateApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (importTemplateApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [importTemplateApiData]);
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
    }, [workflowActivityData]);

    const onChange = (page) => {

        setCurrentPage(page);
        requestListHistoryApi({
            page: page
        });
    };

    const showWorkflowDetail = (data) => {
        requestGetWorkflowActivityApi({ fileId: data.fileId })
        // setDataApprove(data);
        setHistoryOpen(true);
    }
    const onGoBackListPage = () => {
        navigate("/admin/documents")
    }
    const handleCancel = () => {
        setIsEnd(null);
        setHistoryOpen(false);
    };
    const statusEnd = (
        <div style={{ border: "1px solid green", fontWeight: "bold", borderRadius: "5px", padding: "3px", backgroundColor: "green", color: '#fff' }}>Đã kết thúc</div>
    )
    const statusProcess = (
        <div style={{ border: "1px solid #A19C9B", fontWeight: "bold", borderRadius: "5px", padding: "3px", backgroundColor: "#A19C9B", color: '#fff' }}>Đang thực hiện</div>
    )


    return (
        <AdminCommomLayout>
            <Row style={{ padding: '20px' }} gutter={[0, 32]}>
                <Col span={24}>
                    <div className='' style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        {importTemplateApiData.state === REQUEST_STATE.SUCCESS &&
                            <>
                                <Title level={5}>Lịch sử nhập liệu mẫu nhập "{importTemplateApiData.data.name}"</Title>
                                <span onClick={onGoBackListPage} style={{ fontSize: '10px', cursor: 'pointer', color: 'geekblue' }}>( Trở lại danh sách )</span>
                            </>
                        }

                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên mẫu nhập" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Spin size="large" spinning={loading}>
                        <Table scroll={{ y: 500 }} pagination={false} size="middle" columns={columns} dataSource={listHistory}
                        />
                        <Pagination showTotal={t => `Tổng số : ${t}`} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />

                    </Spin>
                </Col>
            </Row>
            <Modal title={"Lịch sử phê duyệt"} open={historyOpen} onCancel={handleCancel} footer={null}>
                <Spin size="small" spinning={loadingModal}>
                    {isEnd != null && <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '5px' }}><b>Trạng thái : </b> <div>{isEnd ? statusEnd : statusProcess}</div></div>}
                    {workflowActivityData.state === REQUEST_STATE.SUCCESS && workflowActivityData.data.activities.map(x => {
                        return <StepImport setIsEnd={setIsEnd} activity={x} actionLogs={workflowActivityData.data.actionLogs}></StepImport>
                    })}



                </Spin>
            </Modal>
        </AdminCommomLayout>

    )
}

