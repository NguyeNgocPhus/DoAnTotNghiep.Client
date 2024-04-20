import "./styles.css";
import 'reactflow/dist/style.css';
import { Button, Input, Typography, Modal, Form, Select, Spin } from 'antd';
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
        if (createUserApiData !== null) {
            if (createUserApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                handleCancel();
                onCreateUserSuccess(createUserApiData.data);
            } else if (createUserApiData.state === REQUEST_STATE.ERROR) {

            } else if (createUserApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [createUserApiData])

    const onFinish = (values) => {
        console.log('Success:', values);
        requestCreateUserApiData(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleSelectChange = (value) => {
        console.log(`selected ${value}`);
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

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
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
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>

    );
}

