import { useCallback, useEffect, useRef, useState } from 'react';

import "./styles.css";
import 'reactflow/dist/style.css';
import { Breadcrumb, Button, Col, Drawer, Row, Tabs } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { DownloadOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const ListImport = () => {

  


    
    return (
        <AdminCommomLayout>
            <div >
                <Row style={{ height: '50px', borderBottom: '1px solid #f0f0f0', alignItems: 'center', paddingLeft: '20px' }}>
                    <Col span={12}>

                        <Breadcrumb>
                            <Breadcrumb.Item>Location</Breadcrumb.Item>
                            <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" icon={<DownloadOutlined />} />
                    </Col>
                </Row>
            </div>
            <div>
                Import 
            </div>

        </AdminCommomLayout>

    );
}

