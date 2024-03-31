import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import 'reactflow/dist/style.css';
import {Button, Col, Input, Row, Space, Table, Typography, Tag } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { SearchOutlined , PlusOutlined} from '@ant-design/icons';
const { Title } = Typography;

export const CreateUser = () => {

   
    return (
        <AdminCommomLayout>
            <Row style={{padding:'20px'}} gutter={[0,32]}>
                <Col span={24}>
                    <div className='header_list_users'>
                        <Title level={5}>Tạo người dùng</Title>
                        <div>
                            <Button icon={<PlusOutlined />} type="primary" size="large">Thêm mới</Button>
                        </div>
                    </div>
                </Col>
                
            </Row>

        </AdminCommomLayout>

    );
}

