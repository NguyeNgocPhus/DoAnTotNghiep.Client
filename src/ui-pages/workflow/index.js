import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Panel, Background, Controls } from 'reactflow';
import { CustomEdge } from './customEdge';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Breadcrumb, Button, Col, Drawer, Row, Tabs } from 'antd';
import { AdminCommomLayout } from '../common/layout/admin/admin-common';
import { DownloadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AddNodeDrawer } from './addNode';

const initialNodes = [
    { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
    { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
    { id: 'c', position: { x: 0, y: 200 }, data: { label: 'Node C' } },
];

const initialEdges = [
    { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
    { id: 'b->c', type: 'custom-edge', source: 'b', target: 'c' },
];

const edgeTypes = {
    'custom-edge': CustomEdge,
};


const edgeOptions = {
    animated: true,
    style: {
        stroke: 'white',
    },
};
const connectionLineStyle = { stroke: 'white' };

export const WorkflowDetail = () => {

    const [visibleStore, setVisibleStore] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (connection) => {
            const edge = { ...connection, type: 'custom-edge' };
            setEdges((eds) => addEdge(edge, eds));
        },
        [setEdges],
    );
    const openModal = () => {
        setVisibleStore(true);
    }
    const onCloseStore = () => {
        setVisibleStore(false);
    }

    const containerStyle = {
        position: 'relative',
        overflow: 'hidden',
        with: '100vw',
        height: '100vh',
    };
 
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
            <div style={containerStyle}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    defaultEdgeOptions={edgeOptions}
                    onConnect={onConnect}
                    edgeTypes={edgeTypes}
                    fitView
                    connectionLineStyle={connectionLineStyle}
                >
                    <Panel position="top-left" onClick={openModal}>
                        <Button size='large'>Add Node</Button>
                    </Panel>
                    <Controls showInteractive={false} />
                    <AddNodeDrawer visibleStore={visibleStore} onCloseStore={onCloseStore}></AddNodeDrawer>

                    <Background variant="cross" />
                </ReactFlow>
            </div>

        </AdminCommomLayout>

    );
}

