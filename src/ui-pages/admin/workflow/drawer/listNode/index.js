import { Drawer, Tabs } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import "./styles.css";
import { ListNodeTrigger } from "./triggers/listNodeTrigger";
import { ListNodeAction } from "./actions/listNodeAction";
export const ListNodeDrawer = ({ open, onClose }) => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const operations = <CloseCircleOutlined size='large' onClick={onClose} />;

    var listNode = [
        {
            image: "",
            type: "trigger",
            key: "FileUpload",
            name: "Tài liệu được đẩy lên",
            description: "Kích hoạt khi có tài liệu được đẩy lên hệ thống"
        },
        {
            image: "",
            type: "trigger",
            key: "HttpEndpoint",
            name: "Cuộc gọi API",
            description: "Kích hoạt khi có HTTP request được gửi đến"
        },
        {
            image: "",
            type: "trigger",
            key: "Cron",
            name: "Lập lịch",
            description: "Kích hoạt dựa trên một CRON expression"
        },
        {
            image: "",
            type: "action",
            key: "Approve",
            name: "Phê duyệt",
            description: "Phê duyệt theo quyền người dùng"
        },
        {
            image: "",
            type: "action",
            key: "Reject",
            name: "Từ chối",
            description: "Từ chối theo quyền người dùng"
        },
        {
            image: "",
            type: "action",
            key: "SendEmail",
            name: "Gửi Email",
            description: "Gửi Email tới người dùng"
        },
        {
            image: "",
            type: "action",
            key: "Condition",
            name: "Điều kiện",
            description: "Điều kiện cho kịch bản workflow"
        },
        {
            image: "",
            type: "action",
            key: "Branch",
            name: "Luồng rẽ nhanh",
            description: "Thực hiện luồng công việc phân nhánh thành nhiều nhánh"
        }
    ]
    const listNodeTrigger = listNode.filter(x=>x.type === "trigger");
    const listNodeAction = listNode.filter(x=>x.type === "action");


    return (
        <>
            <Drawer placement="left" getContainer={false} mask={false} closable={false} open={open}>

                <Tabs tabBarExtraContent={operations} defaultActiveKey="1">
                    <Tabs.TabPane tab="Trigger" key="1">
                        <ListNodeTrigger nodes={listNodeTrigger}></ListNodeTrigger>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Hành động" key="2">
                        <ListNodeAction nodes={listNodeAction}></ListNodeAction>
                    </Tabs.TabPane>

                </Tabs>

            </Drawer>
        </>
    );
}