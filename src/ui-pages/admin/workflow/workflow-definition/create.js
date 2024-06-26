import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Panel, Background, Controls, MarkerType, useReactFlow, BackgroundVariant } from 'reactflow';
import { CustomEdge } from '../customEdge';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Breadcrumb, Button, Col, Row } from 'antd';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { DownloadOutlined } from '@ant-design/icons';
import { ListNodeDrawer } from '../drawer/listNode';
import { CustomConnectionLine } from '../customConnectionLine';
import { NodeDetailDrawer } from '../drawer/nodeDetail';
import { nodeTypes } from '../../../../helpers/workflowHepler';
import { v4 as uuidv4 } from 'uuid';
import { useUpdateWfDefinition } from '../../../../store/workflow/use-update-wf-definition';

const edgeTypes = {
    'custom-edge': CustomEdge,
};
const containerStyle = {
    position: 'relative',

    with: '100vw',
    height: '100vh',
};
const defaultEdgeOptions = {
    style: { strokeWidth: 1, stroke: 'black' },
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
};

const connectionLineStyle = {
    strokeWidth: 3,
    stroke: 'black',
};
export const CreateWorkflow = () => {

    const connectingNodeId = useRef(null);
    const [openListNodeDrawer, setOpenListNodeDrawer] = useState(false);
    const [openNodeDetailDrawer, setNodeDetailDrawer] = useState(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { screenToFlowPosition } = useReactFlow();

    const [updateWfDefinitionApiData, requestUpdateWfDefinitionApiData] = useUpdateWfDefinition();


    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    useEffect(() => {
        setNodes([]);
        setEdges([]);
    }, []);

    /// on connect 
    const onConnect = useCallback(
        (connection) => {

            const callBackSetEdge = () => {
                setEdges((eds) => addEdge(connection, eds));
                setNodes((nds) => {
                    return nds.map(node => {
                        if (node.id === connection.target) {
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    forceToolbarVisible: false,
                                }
                            }
                        }
                        return node;
                    });
                })
            }
            setNodes((nds) => {
                return nds.map(node => {
                    if (node.id === connection.target) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                forceToolbarVisible: true,
                                callBackSetEdge: callBackSetEdge
                            }
                        }
                    }
                    return node;
                });
            })


        },
        [setEdges, setNodes],
    );
    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);
    const onConnectEnd = useCallback((event) => {

    }, [screenToFlowPosition]);


    /// on drag and drop node

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const typeNode = event.dataTransfer.getData('type');
            const nameNode = event.dataTransfer.getData('name');
            const descNode = event.dataTransfer.getData('description');

            // check if the dropped element is valid
            if (typeof typeNode === 'undefined' || !typeNode) {
                return;
            }


            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: uuidv4(),
                type: typeNode,
                position,
                data: { name: `${nameNode}` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );
    const [dataNodeDetail, setDataNodeDetail] = useState({});
    const { setViewport, zoomIn, zoomOut } = useReactFlow();
    const onNodeClick = useCallback((_, node) => {
        setNodeDetailDrawer(true);

        setDataNodeDetail(node);
        setNodes((nodes) =>

            nodes.map((n) => ({
                ...n,
                className: n.id === node.id ? 'highlight' : '',
            }))
        );
    }, [setNodes, setViewport]);

    // on create workflow
    const onCreateWorkflow = () => {
        // const workflow = createWorkflow(nodes, edges);
        // console.log("workflow", workflow);
        // requestCreateWorkflow(workflow);

    }

    
    return (
        <AdminCommomLayout>
            
            <div >
                <Row style={{ height: '50px', borderBottom: '1px solid #f0f0f0', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
                    <Col span={12}>

                        <Breadcrumb>
                            <Breadcrumb.Item>Location</Breadcrumb.Item>
                            <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button type="primary" onClick={onCreateWorkflow} icon={<DownloadOutlined />} >Xuất bản</Button>

                    </Col>
                </Row>
            </div>
            <div style={containerStyle}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    defaultEdgeOptions={defaultEdgeOptions}
                    onInit={setReactFlowInstance}
                    onConnect={onConnect}
                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}
                    onNodeClick={onNodeClick}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    fitView
                    connectionLineStyle={connectionLineStyle}
                    connectionLineComponent={CustomConnectionLine}
                    preventScrolling={false}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <Panel position="top-left" onClick={() => { setOpenListNodeDrawer(true) }}>
                        <Button size='large'>Thêm hành động</Button>
                    </Panel>
                    <Controls showInteractive={false} />
                    <ListNodeDrawer open={openListNodeDrawer} onClose={() => { setOpenListNodeDrawer(false) }}></ListNodeDrawer>
                    <NodeDetailDrawer open={openNodeDetailDrawer} data={dataNodeDetail} onClose={() => { setNodeDetailDrawer(false) }}></NodeDetailDrawer>

                    <Background variant={BackgroundVariant.Dots} />
                </ReactFlow>
            </div>

        </AdminCommomLayout>

    );
}

