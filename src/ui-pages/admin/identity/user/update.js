import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Input, Typography, Modal, Form, Select, Spin, notification } from 'antd';
import { useGetRoles } from "../../../../store/auth/use-get-roles";
import { useEffect, useState } from "react";
import { REQUEST_STATE } from "../../../../app-config/constants";
import { useCreateUser } from "../../../../store/auth/use-create-user";
import { useGetUserDetail } from "../../../../store/auth/use-get-user-detail";
import { useUpdateUser } from "../../../../store/auth/use-update-user";
const { Title } = Typography;

export const UpdateUser = ({ id, isModalOpen, handleCancel, onUpdateUserSuccess }) => {
    const [rolesApiData, requestGetRolesApiData] = useGetRoles();
    const [updateUserApiData, requestUpdateUserApiData] = useUpdateUser();
    const [userDetailApiData, requestGetUserDetailApiData] = useGetUserDetail();
    const [listRole, setListRole] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userUpdate, setUserUpdate] = useState({});

  

    useEffect(() => {
        requestGetRolesApiData();
    }, []);
    
    useEffect(() => {
        if (isModalOpen && id !== null && id !== undefined) {
            requestGetUserDetailApiData({ id });
        }
        
    }, [id,isModalOpen]);

    useEffect(() => {
        if (rolesApiData !== null) {
            if (rolesApiData.state === REQUEST_STATE.SUCCESS) {
                console.log("rolesApiData",rolesApiData)
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
                notification.success({
                    message: 'Cập nhật thành công',
                });

                handleCancel();
                onUpdateUserSuccess(userUpdate);
            } else if (updateUserApiData.state === REQUEST_STATE.ERROR) {
                setLoading(false);

            } else if (updateUserApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [updateUserApiData])


    const onFinish = (values) => {
        console.log("values",values)
        const userUpdate = {
            ...values,
            id
        };
        setUserUpdate(userUpdate)
        requestUpdateUserApiData(userUpdate)
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
                        <Input disabled />
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
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>}

            </Spin>
        </Modal>


    );
}

