import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Col, Input, Row, Space, Table, Typography, Tag, Modal, Form, Upload, Spin, Pagination, notification, Popconfirm } from 'antd';
import { QuestionCircleOutlined, PlusOutlined, CheckOutlined, EditOutlined, UploadOutlined, HistoryOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormCreate } from './form_create';
import { FormUpload } from './form_upload';
import { useGetListImportTemplate } from '../../../../store/import-template/use-get-list-import-template';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { useCreateImportTemplate } from '../../../../store/import-template/use-create-import-template';
import { useDeleteImportTemplate } from '../../../../store/import-template/use-delete-import-template';
import { History } from './history';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { hasRole } from '../../../../app-helper/jwtHepler';
const { Title } = Typography;


const tags = [

    { label: "Tài chính kế toán", value: "TCKT" },
    { label: "Kết quả kinh doanh", value: "KQKD" },
    { label: "Công nợ phải thu/phải trả", value: "CN" },
    { label: "Báo cáo đầu tư", value: "DT" }
]
export const ListDocument = () => {
    const hasImportTemplate = hasRole("Document") || hasRole("SuperAdmin");
    const hasUpload = hasRole("Upload") || hasRole("SuperAdmin");
    const columns = [
        {
            title: 'Tên Báo cáo',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Loại Báo cáo',
            dataIndex: 'tag',
            key: 'tag',
            width: '250px',
            render: (text) => <div>{tags.find(x => x.value === text).label}</div>,
        },
        {
            title: 'Trạng thái',
            key: 'active',
            width: '100px',
            dataIndex: 'active',
            render: (_, { active }) => (
                <>
                    {active && <CheckOutlined style={{ color: 'green' }} />}
                </>
            ),
        },
        {
            title: 'Đã có quy trình',
            key: 'hasWorkflow',
            width: '150px',
            dataIndex: 'hasWorkflow',
            render: (_, { hasWorkflow }) => (
                <>
                    {hasWorkflow && <CheckOutlined style={{ color: 'green' }} />}
                </>
            ),
        },
        {
            title: 'Tải mẫu báo cáo',
            key: 'fileTemplateId',
            width: '150px',
            dataIndex: 'fileTemplateId',
            render: (_, { fileTemplateId, fileTemplateName }) => (
                <>
                    {fileTemplateId && <Typography.Link href={`http://localhost:5000/Api/FileStorage/Get/${fileTemplateId}?name=${fileTemplateName}`}>Tải xuống</Typography.Link>}
                </>
            ),
        },
        {
            title: '',
            key: 'action',
            width: '170px',
            dataIndex: 'action',
            render: (_, data) => (
                <>
                    {/* {console.log("JKey", key)} */}
                    <Row gutter={[10, 20]}>
                        <Col className='import_teamplate_action_icon'>
                            <EditOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onUpdateImportTemplate(data.key);
                            }

                            } />
                        </Col>
                        <Col className='import_teamplate_action_icon'>
                            <HistoryOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onClickViewHistory(data)
                            }} />
                        </Col>
                        {hasUpload && <Col className='import_teamplate_action_icon' >
                            <UploadOutlined style={{ cursor: 'pointer' }} onClick={() => {
                                onClickUploadDocument(data.key, data.hasWorkflow)
                            }} />
                        </Col>}

                        <Col className='import_teamplate_action_icon'>

                            <Popconfirm
                                title="Xác nhận xoá dữ liệu"
                                onConfirm={() => {  onDeleteImportTemplate(data.key) }}
                                // description="Are you sure to delete this task?"
                                icon={
                                    <QuestionCircleOutlined
                                        style={{
                                            color: 'red',
                                        }}
                                    />
                                }
                            >
                                <DeleteOutlined className='import_teamplate_action_icon'  style={{ cursor: 'pointer', color: 'red' }} />
                            </Popconfirm>
                            {/* <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }}  /> */}
                        </Col>
                    </Row>



                </>
            ),
        },
    ];

    const [createImportTemplateApiData, requestCreateImportTemplateApiData] = useCreateImportTemplate();
    const [deleteImportTemplateApiData, requestDeleteImportTemplateApiData] = useDeleteImportTemplate();
    const [listImportTemplateApiData, requestListImportTemplateApi] = useGetListImportTemplate();
    const [formCreateOpen, setFormCreateOpen] = useState(false);
    const [formUploadOpen, setFormUploadOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [dataHistory, setDataHistory] = useState(null);
    const [listImportTemplate, setListImportTemplate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasWf, setHasWf] = useState(null);
    // search field
    const [searchName, setSearchName] = useState("");
    const [searchTag, setSearchTag] = useState("");


    const navigate = useNavigate();

    const [fileTemplateId, setFileTemplateId] = useState(null);
    const [importTemplateId, setImportTemplateId] = useState(null);

    const showFormCreate = () => {
        setFormCreateOpen(true);
    };



    const onCreateImportTemplate = (values) => {
        if (fileTemplateId === null) {
            notification.error({
                message: 'Vui lòng tải lên mẫu báo cáo',
            });
            return;
        } else {

            form.resetFields();
            requestCreateImportTemplateApiData({ ...values, fileTemplateId });
        }

    };
    const onUpdateImportTemplate = (id) => {
        setFormCreateOpen(true);
    };
    const onDeleteImportTemplate = (id) => {
        // console.log(id);
        requestDeleteImportTemplateApiData({ id });
    };

    const onClickViewHistory = (data) => {
        // setHistoryOpen(true);
        navigate(`/admin/history/${data.key}`)
    }
    const onClickUploadDocument = (id, haswf) => {
        setImportTemplateId(id);
        setHasWf(haswf);
        setFormUploadOpen(true);
    }


    useEffect(() => {
        requestListImportTemplateApi({
            page: 1
        });
    }, [])
    useEffect(() => {
        if (listImportTemplateApiData !== null) {
            if (listImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                // console.log("listImportTemplateApiData.state",listImportTemplateApiData.data);
                var data = listImportTemplateApiData.data.items.map(x => {
                    return {
                        // id: x.id,
                        name: x.name,
                        tag: x.tag,
                        key: x.id,

                        hasWorkflow: x.hasWorkflow,
                        active: x.active,
                        fileTemplateId: x.fileTemplateId,
                        fileTemplateName: x.fileTemplateName

                    }
                });
                setTotal(listImportTemplateApiData.data.totalCount)
                setListImportTemplate(data);

            } else if (listImportTemplateApiData.state === REQUEST_STATE.ERROR) {
                // message.error('This is an error message');
            } else if (listImportTemplateApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [listImportTemplateApiData])

    useEffect(() => {
        if (deleteImportTemplateApiData !== null) {
            if (deleteImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                notification.success({
                    message: 'Xoá dữ liệu thành công',
                });
                requestListImportTemplateApi({
                    page: currentPage,
                    name: searchName,
                    tag: searchTag,

                });
            } else if (deleteImportTemplateApiData.state === REQUEST_STATE.ERROR) {

            } else if (deleteImportTemplateApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [deleteImportTemplateApiData])

    useEffect(() => {
        if (createImportTemplateApiData !== null) {
            if (createImportTemplateApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                setFormCreateOpen(false);
                requestListImportTemplateApi({
                    page: 1
                });
            } else if (createImportTemplateApiData.state === REQUEST_STATE.ERROR) {

            } else if (createImportTemplateApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [createImportTemplateApiData]);
    const onChange = (page) => {

        setCurrentPage(page);
        requestListImportTemplateApi({
            page: page
        });
    };
    const onFilter = () => {
        requestListImportTemplateApi({
            page: currentPage,
            name: searchName,
            tag: searchTag,

        });
    };
    const onClearFilter = (value) => {
        setSearchName("");
        setSearchTag("");

        requestListImportTemplateApi({
            page: currentPage
        });
    };

    return (
        <>
            <AdminCommomLayout>
                <Row style={{ padding: '20px' }}>
                    <Col span={24}>
                        <div className='header_list_users'>
                            <Title level={5}>Danh sách mẫu báo cáo</Title>
                            {/* <div>
                               {hasImportTemplate && <Button onClick={showFormCreate} icon={<PlusOutlined />} type="primary" size="large">Tạo mẫu nhập</Button>} 
                            </div> */}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className='table'>
                            <div className='table_add'>

                                {hasImportTemplate && <Button onClick={showFormCreate} icon={<PlusOutlined />} type="primary" size="large">Tạo mẫu báo cáo</Button>}

                            </div>
                            <Row className='table_filter' gutter={[15, 0]}>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Tên
                                    </div>
                                    <Input value={searchName} onChange={(e) => { setSearchName(e.target.value) }} size="small" placeholder="Tìm kiếm theo tên" />

                                </Col>
                                <Col span={4} className='field_filter'>
                                    <div className='field_name'>
                                        Loại báo cáo
                                    </div>
                                    <Input value={searchTag} onChange={(e) => { setSearchTag(e.target.value) }} size="small" placeholder="Tìm kiếm theo loại mẫu nhập" />

                                </Col>

                                <Col span={4} style={{ display: "flex", alignItems: 'end', gap: '10px' }}>
                                    <Button size='small' type='primary' onClick={onFilter}>Lọc</Button>
                                    <Button size='small' onClick={onClearFilter}>Clear bộ lọc</Button>
                                </Col>
                            </Row>
                            <Table scroll={{ y: 600 }} className='table_data' size="middle" pagination={false} loading={loading} columns={columns} dataSource={listImportTemplate} />

                            <div className='table_paging'>
                                <div><b>Tổng số : {total}</b></div>
                                <Pagination style={{ marginTop: '10px' }} defaultCurrent={1} current={currentPage} onChange={onChange} total={total} />

                            </div>
                        </div>





                        {/* <Spin size="large" spinning={loading}>
                            {listImportTemplate.length > 0 && <Table size="middle" columns={columns} dataSource={listImportTemplate} />}
                        </Spin> */}
                    </Col>
                </Row>
                <FormCreate setFileTemplateId={setFileTemplateId} form={form} open={formCreateOpen} onClose={() => { setFormCreateOpen(false) }} onFinish={onCreateImportTemplate}></FormCreate>
                <FormUpload hasWf={hasWf} importTemplateId={importTemplateId} open={formUploadOpen} onClose={() => { setFormUploadOpen(false) }}></FormUpload>
                {/* <History dataHistory={dataHistory} historyOpen={historyOpen} setHistoryOpen={setHistoryOpen} ></History> */}
            </AdminCommomLayout>
        </>

    );
}

