import { Col, Row } from "antd";



export const AccountProfile = ({myProfile}) =>{

    return (
        <div>
             <div className="title-info">TÀI KHOẢN CỦA TUI</div>
            <Row className={"account-info"}>
                <Col span={8}>
                    <div style={{fontSize:"25px",fontWeight:"700"}}>{myProfile.name}</div>
                    <p>{myProfile.email}</p>
                </Col>
                <Col  span={4}>
                    <h4>Sinh nhật</h4>
                    <p>{myProfile.birthday}</p>
                </Col>
                <Col  span={4}>
                    <h4>Điện thoại</h4>
                    <p>{myProfile.phone}</p>
                </Col >
                <Col  span={4}>
                    <h4>Đã chi tiêu</h4>
                    <p>1,000,000 đ</p>
                </Col>
                <Col  span={4}>
                    <h4>Điểm tích luỹ</h4>
                    <p></p>
                </Col>
            </Row>
        </div>
    )
}