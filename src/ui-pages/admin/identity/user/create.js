import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Input, Typography, Modal, Form, Select, Spin, notification } from 'antd';
import { useGetRoles } from "../../../../store/auth/use-get-roles";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../../app-config/constants";
import { useCreateUser } from "../../../../store/auth/use-create-user";
const { Title } = Typography;

export const CreateUser = ({ isModalOpen, handleCancel , onCreateUserSuccess}) => {

    const [rolesApiData, requestGetRolesApiData] = useGetRoles();
    const [createUserApiData, requestCreateUserApiData] = useCreateUser();
    const [listRole, setListRole] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestGetRolesApiData();
    }, []);

    useEffect(() => {
        if (rolesApiData !== null) {
            if (rolesApiData.state === REQUEST_STATE.SUCCESS) {
                var roles = rolesApiData.data.map(x => {
                    return {
                        label: x.name,
                        value: x.roleCode,
                    }
                });
                setListRole(roles);
            } else if (rolesApiData.state === REQUEST_STATE.ERROR) {

            } else if (rolesApiData.state === REQUEST_STATE.REQUEST) {

            }
        }
    }, [rolesApiData])

    useEffect(() => {
        if (createUserApiData !== null) {
            if (createUserApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                handleCancel();
                notification.success({
                    message: 'Thêm mới thành công',
                });

                onCreateUserSuccess(createUserApiData.data);
            } else if (createUserApiData.state === REQUEST_STATE.ERROR) {

            } else if (createUserApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [createUserApiData])

    const onFinish = (values) => {
        // console.log('Success:', values);
        requestCreateUserApiData(values);
    };
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    const handleSelectChange = (value) => {
        // console.log(`selected ${value}`);
    };

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    return (
        <Spin size="large" spinning={loading}>
            <Modal title="Tạo người dùng mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[{ required: true, message: 'Nhập tên người dùng' }]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Nhập email' },
                        {
                            message: 'Nhập đúng định dạng email',
                            validator: (_, value) => {
                              if (value.match(
                                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                              )) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject('Some message here');
                              }
                             }
                           }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Nhập số điện thoại' },
                        {
                            message: 'Nhập đúng định dạng số điên thoại',
                            validator: (_, value) => {
                              if (value.match(
                                /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
                              )) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject('Some message here');
                              }
                             }
                           }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nhóm người dùng"
                        name="roles"
                        rules={[{ required: true, message: 'Chọn nhóm người dùng' }]}
                    >
                        {listRole.length > 0 && <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Chọn nhóm người dùng"
                            onChange={handleSelectChange}
                            options={listRole}
                        />}
                    </Form.Item>


                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>

    );
}

