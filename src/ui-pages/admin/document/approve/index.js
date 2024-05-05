import { useEffect, useState } from 'react';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Col, Input, Row, Table, Typography, Tag, Spin, Modal, Button, Pagination } from 'antd';
import { SearchOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useGetListApprove } from '../../../../store/approve/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
import moment from 'moment';
import { StepImport } from './step';
const { Title } = Typography;


export const ListApprove = () => {
    const columns = [

        {
            title: 'Create Name',
            key: 'createdByName',
            dataIndex: 'createdByName',
            render: (_, { createdByName }) => (
                <>
                    {createdByName && <div>{createdByName}</div>}
                </>
            ),
        },
        {
            title: 'ImportTemplate Name',
            key: 'importTemplateName',
            dataIndex: 'importTemplateName',
            render: (_, { importTemplateName }) => (
                <>
                    {importTemplateName && <div>{importTemplateName}</div>}
                </>
            ),
        },
        {
            title: 'File Upload',
            key: 'fileId',
            dataIndex: 'fileId',
            render: (_, { fileId }) => (
                <>
                    {fileId && <Typography.Link href={`http://localhost:5000/Api/FileStorage/Get/${fileId}`} >Download</Typography.Link>}
                </>
            ),
        },
        {
            title: 'Uploaded Time',
            key: 'createdTime',
            dataIndex: 'createdTime',
            render: (_, { createdTime }) => (
                <>
                    {createdTime && <Typography.Text >{moment(new Date(createdTime)).format('DD-MM-YYYY HH:mm')}</Typography.Text>}
                </>
            ),
        },
        {
            title: 'Status',
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

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

    const showWorkflowDetail = (data) => {
        console.log(data);
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
                {dataApprove && <p>{`${dataApprove.importTemplateName} (${moment(new Date(dataApprove.createdTime)).format('DD-MM-YYYY HH:mm')})`}</p>}
                <StepImport></StepImport>
                <StepImport></StepImport>
                <StepImport></StepImport>
                <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                    <Button type="primary" style={{ background: "green", borderColor: "green" }}>
                        Phê duyệt
                    </Button>
                    <Button type="primary" style={{ background: "red", borderColor: "red" }}> Từ chối</Button>
                </div>
            </Modal>


        </>

    );
}

