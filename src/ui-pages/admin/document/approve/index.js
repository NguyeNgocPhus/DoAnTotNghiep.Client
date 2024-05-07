import { useEffect, useState } from 'react';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Col, Input, Row, Table, Typography, Tag, Spin, Modal, Button, Pagination } from 'antd';
import { SearchOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useGetListApprove } from '../../../../store/approve/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
import moment from 'moment';
import { StepImport } from './step';
import { useGetWorkflowActivity } from '../../../../store/workflow/use-wf-activity';
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
            render: (text) => {
                let color = text.length > 5 ? 'geekblue' : 'green';
                if (text === 'loser') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
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
                            <DeleteOutlined className='import_teamplate_action_icon' style={{ cursor: 'pointer', color: 'red' }} />
                        </Col>
                    </Row>



                </>
            ),
        },
    ];

    const [workflowActivityData, requestGetWorkflowActivityApi] = useGetWorkflowActivity();
    const [listApproveApiData, requestListApproveApi] = useGetListApprove();
    const [listApprove, setListApprove] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataApprove, setDataApprove] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
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
                setLoading(false);
                console.log("workflowActivityData", workflowActivityData)
                const data = workflowActivityData.data;

            } else if (workflowActivityData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (workflowActivityData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [workflowActivityData])
    const showWorkflowDetail = (data) => {
        requestGetWorkflowActivityApi({ fileId: data.fileId })
        setDataApprove(data);
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (page) => {

        setCurrentPage(page);
        requestListApproveApi({
            page: page
        });
    };
    return (
        <>
            <Row style={{ padding: '20px' }} gutter={[0, 32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Danh sách dữ liệu phê duyệt</Title>
                    </div>
                </Col>
                <Col span={24}>
                    <Input icon={<SearchOutlined />} style={{ width: '70%' }} size="large" placeholder="Tìm kiếm theo tên mẫu nhập" prefix={<SearchOutlined />} />
                </Col>
                <Col span={24}>
                    <Spin size="large" spinning={loading}>
                        <Table columns={columns} size="middle" dataSource={listApprove}
                            pagination={false}
                        />

                        <Pagination showTotal={t => `Tổng số : ${t}`} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />
                    </Spin>
                </Col>
            </Row>
            <Modal title={"Phê duyệt tài liệu"} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Spin size="large" spinning={loading}>
                    {dataApprove && <p>{`${dataApprove.importTemplateName} (${moment(new Date(dataApprove.createdTime)).format('DD-MM-YYYY HH:mm')})`}</p>}
                    {workflowActivityData.state === REQUEST_STATE.SUCCESS && workflowActivityData.data.activities.map(x => {
                        return <StepImport activity={x} actionLogs={workflowActivityData.data.actionLogs}></StepImport>
                    })}

                    <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                        <Button type="primary" style={{ background: "green", borderColor: "green" }}>
                            Phê duyệt
                        </Button>
                        <Button type="primary" style={{ background: "red", borderColor: "red" }}> Từ chối</Button>
                    </div>
                </Spin>
            </Modal>


        </>

    );
}

