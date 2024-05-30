import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Table, Typography, Tag, Modal, Spin, Pagination, Select } from 'antd';
import { REQUEST_STATE } from '../../../../app-config/constants';
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
            title: 'Mã báo cáo',
            key: 'code',
            width:'100px',
            dataIndex: 'code',
            render: (_, { code }) => (
                <>
                    {code && <div>{code}</div>}
                </>
            ),
        },
        {
            title: 'Người nhập báo cáo',
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
            title: 'Báo cáo tải lên',
            key: 'fileId',
            dataIndex: 'fileId',
            render: (_, { fileId, fileName }) => (
                <>
                    {fileId && <Typography.Link href={`http://localhost:5000/Api/FileStorage/Get/${fileId}?name=${fileName}`} >{fileName}</Typography.Link>}
                </>
            ),
        },
        {
            title: 'Ngày nhập báo cáo',
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
    const listStatus = [
        { label: "Đã phê duyệt", value: "APPROVE" },
        { label: "Đã từ chối", value: "REJECT" },
        { label: "Chờ phê duyệt", value: "PENDING" }
    ]
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
    // search field
    const [searchName, setSearchName] = useState("");
    const [searchCode, setSearchCode] = useState("");
    const [searchStatus, setSearchStatus] = useState([]);

    useEffect(() => {
        requestListHistoryApi({ importTemplateIds: [id] });
        requestImportTemplateApi({ id });
    }, [])
    useEffect(() => {
        if (listHistoryApiData !== null) {
            if (listHistoryApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                var data = listHistoryApiData.data.items.map(x => {
                    return {
                        createdTime: x.createdTime,
                        importTemplateName: x.importTemplateName,
                        createdByName: x.createdByName,
                        key: x.id,
                        code: x.code,
                        status: x.status,
                        fileId: x.fileId,
                        fileName : x.fileName,

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

    const onFilter = () => {
        requestListHistoryApi({
            importTemplateIds: [id],
            page: currentPage,
            createdByName: searchName,
            status: searchStatus,
            code: searchCode,
        });
    };
    const onClearFilter = (value) => {

        setSearchName("");

        setSearchStatus([]);
        requestListHistoryApi({
            importTemplateIds: [id],
            page: currentPage
        });
    };
    return (
        <AdminCommomLayout>
            <Row style={{ padding: '20px' }}>
                <Col span={24}>
                    <div className='' style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        {importTemplateApiData.state === REQUEST_STATE.SUCCESS &&
                            <>
                                <Title level={5}>Lịch sử nhập liệu mẫu nhập "{importTemplateApiData.data.name}"</Title>
                                <span onClick={onGoBackListPage} style={{ fontSize: '10px', cursor: 'pointer', color: 'blue' }}>( Trở lại danh sách )</span>
                            </>
                        }

                    </div>
                </Col>
                {/* <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên mẫu nhập" prefix={<SearchOutlined />} />
                </Col> */}
                <Col span={24}>
                    {/* <Spin size="large" spinning={loading}>
                        <Table scroll={{ y: 500 }} pagination={false} size="middle" columns={columns} dataSource={listHistory}
                        />
                        <Pagination showTotal={t => `Tổng số : ${t}`} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />

                    </Spin> */}
                    <div className='table'>

                        <Row className='table_filter' gutter={[15, 0]}>
                        <Col span={4} className='field_filter'>
                                <div className='field_name'>
                                    Mã báo cáo
                                </div>
                                <Input value={searchCode} onChange={(e) => { setSearchCode(e.target.value) }} size="small" placeholder="Tìm kiếm theo tên" />

                            </Col>
                            <Col span={4} className='field_filter'>
                                <div className='field_name'>
                                    Người nhập liệu
                                </div>
                                <Input value={searchName} onChange={(e) => { setSearchName(e.target.value) }} size="small" placeholder="Tìm kiếm theo tên" />

                            </Col>

                            <Col span={4} className='field_filter'>
                                <div className='field_name'>
                                    Trạng thái
                                </div>
                                {listStatus.length > 0 && <Select
                                    size="small"
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    value={searchStatus}
                                    placeholder="Chọn trạng thái"
                                    onChange={(values) => { setSearchStatus(values) }}
                                    options={listStatus}
                                />}
                            </Col>

                            <Col span={4} style={{ display: "flex", alignItems: 'end', gap: '10px' }}>
                                <Button size='small' type='primary' onClick={onFilter}>Lọc</Button>
                                <Button size='small' onClick={onClearFilter}>Clear bộ lọc</Button>
                            </Col>
                        </Row>
                        <Table scroll={{ y: 500 }} className='table_data' size="middle" pagination={false} loading={loading} columns={columns} dataSource={listHistory} />

                        <div className='table_paging'>
                            <div><b>Tổng số : {total}</b></div>
                            <Pagination style={{ marginTop: '10px' }} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />

                        </div>
                    </div>
                </Col>
            </Row>
            <Modal title={"Lịch sử phê duyệt"} open={historyOpen} onCancel={handleCancel} footer={null}>
                <Spin size="small" spinning={loadingModal}>
                    {/* {isEnd != null && <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '5px' }}><b>Trạng thái : </b> <div>{isEnd ? statusEnd : statusProcess}</div></div>} */}
                    {workflowActivityData.state === REQUEST_STATE.SUCCESS && workflowActivityData.data.actionLogs.map(x => {
                        return <StepImport setIsEnd={setIsEnd} activity={x} actionLogs={workflowActivityData.data.actionLogs}></StepImport>
                    })}



                </Spin>
            </Modal>
        </AdminCommomLayout>

    )
}

