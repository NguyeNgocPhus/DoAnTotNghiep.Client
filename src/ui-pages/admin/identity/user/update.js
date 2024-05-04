import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Input, Typography, Modal, Form, Select, Spin } from 'antd';
import { useGetRoles } from "../../../../store/auth/use-get-roles";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../../app-config/constants";
import { useCreateUser } from "../../../../store/auth/use-create-user";
import { useGetUserDetail } from "../../../../store/auth/use-get-user-detail";
import { useUpdateUser } from "../../../../store/auth/use-update-user";
const { Title } = Typography;

export const UpdateUser = ({ id, isModalOpen, handleCancel, onCreateUserSuccess }) => {
    const [form] = Form.useForm();
    const [rolesApiData, requestGetRolesApiData] = useGetRoles();
    const [updateUserApiData, requestUpdateUserApiData] = useUpdateUser();
    const [userDetailApiData, requestGetUserDetailApiData] = useGetUserDetail();
    const [listRole, setListRole] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        requestGetRolesApiData();

    }, []);
    useEffect(() => {
        if (id !== null && id !== undefined) {

            requestGetUserDetailApiData({ id });
        }

    }, [id]);

    useEffect(() => {
        if (rolesApiData !== null) {
            if (rolesApiData.state === REQUEST_STATE.SUCCESS) {
                var roles = rolesApiData.data.map(x => {
                    return {
                        label: x.name,
                        value: x.name,
                    }
                });
                setListRole(roles);
            } else if (rolesApiData.state === REQUEST_STATE.ERROR) {

            } else if (rolesApiData.state === REQUEST_STATE.REQUEST) {

            }
        }
    }, [rolesApiData])

    useEffect(() => {
        if (userDetailApiData !== null) {
            if (userDetailApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
            } else if (userDetailApiData.state === REQUEST_STATE.ERROR) {

            } else if (userDetailApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [userDetailApiData])

    useEffect(() => {
        if (updateUserApiData !== null) {
            if (updateUserApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                handleCancel();
                // onCreateUserSuccess(createUserApiData.data);
            } else if (updateUserApiData.state === REQUEST_STATE.ERROR) {
                setLoading(false);
                
            } else if (updateUserApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [updateUserApiData])


    const onFinish = (values) => {
       
        requestUpdateUserApiData({
            ...values,
            id
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleSelectChange = (value) => {
        console.log(`selected ${value}`);
    };


    return (

        <Modal destroyOnClose={true} title="Chỉnh sửa người dùng" open={isModalOpen} onCancel={() => {
            handleCancel();
        }} footer={null}>
            <Spin size="large" spinning={loading}>
                {userDetailApiData.state == REQUEST_STATE.SUCCESS && <Form
                    preserve={false}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={userDetailApiData.data}
                    
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="userName"

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"

                    >
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nhóm người dùng"
                        name="roles"
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
                            Save
                        </Button>
                    </Form.Item>
                </Form>}

            </Spin>
        </Modal>


    );
}

