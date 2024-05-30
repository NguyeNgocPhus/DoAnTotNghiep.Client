import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Panel, Background, Controls, MarkerType, useReactFlow, BackgroundVariant, MiniMap } from 'reactflow';
import { CustomEdge } from '../customEdge';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Breadcrumb, Button, Col, Row, Spin, notification } from 'antd';
import { AdminCommomLayout } from '../../../common/layout/admin/admin-common';
import { ArrowUpOutlined } from '@ant-design/icons';
import { ListNodeDrawer } from '../drawer/listNode';
import { CustomConnectionLine } from '../customConnectionLine';
import { NodeDetailDrawer } from '../drawer/nodeDetail';
import { generateWfDefinitionForApi, generateWfDefinitionForUI, nodeTypes } from '../../../../helpers/workflowHepler';
import { v4 as uuidv4 } from 'uuid';
import { useGetWfDefinition } from '../../../../store/workflow/use-get-wf-definition';
import { useParams } from 'react-router-dom';
import { REQUEST_STATE } from '../../../../app-config/constants';
import { useUpdateWfDefinition } from '../../../../store/workflow/use-update-wf-definition';
import dagre from 'dagre';


const edgeTypes = {
    'custom-edge': CustomEdge,
};
const containerStyle = {
    position: 'relative',

    with: '100vw',
    height: 'calc(100vh - 100px)',
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
export const WorkflowDetail = (props) => {

    const { id } = useParams()
    const connectingNodeId = useRef(null);

    const [wfDefinitionApiData, requestWfDefinitionApiData] = useGetWfDefinition();
    const [updateWfDefinitionApiData, requestUpdateWfDefinitionApiData] = useUpdateWfDefinition();


    const [wfDefinition, setWorklfowDefinition] = useState({});
    const [loading, setLoading] = useState(false);

    const [openListNodeDrawer, setOpenListNodeDrawer] = useState(false);
    const [openNodeDetailDrawer, setNodeDetailDrawer] = useState(false);
    const [dataNodeDetail, setDataNodeDetail] = useState({});

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { setViewport, zoomIn, zoomOut } = useReactFlow();
    const { screenToFlowPosition } = useReactFlow();


    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    useEffect(() => {
        setNodes([]);
        setEdges([]);
        // zoomOut({ duration: 800 })
        requestWfDefinitionApiData({ id });
    }, []);

    // on load workflow on first
    useEffect(() => {
        if (wfDefinitionApiData.state === REQUEST_STATE.SUCCESS) {

            setWorklfowDefinition(wfDefinitionApiData.data);
            const { initialNodes, initialEdges } = generateWfDefinitionForUI({
                nodes: wfDefinitionApiData.data.activities,
                edges: wfDefinitionApiData.data.connections,
            })
            setNodes([...initialNodes]);
            setEdges([...initialEdges]);
            setLoading(false);


        } else if (wfDefinitionApiData.state === REQUEST_STATE.ERROR) {

        } else if (wfDefinitionApiData.state === REQUEST_STATE.REQUEST) {
            setLoading(true);
        }
    }, [wfDefinitionApiData]);


    /// on connect 
    const onConnect = useCallback(
        (connection) => {

            const callBackSetEdge = (bool) => {

                connection.type = "custom-edge";
                connection.data = bool;
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
                        const isNodeCondition = nds.some(x=>x.id === connection.source && x.type === "Condition");
                        console.log("is", isNodeCondition);
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                isNodeCondition: isNodeCondition,
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


    // on click node
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
    const onUpdateWorkflow = () => {
        const workflow = generateWfDefinitionForApi({
            nodes,
            edges,
            id: wfDefinition.definitionId,
            name: wfDefinition.name,
            version: wfDefinition.version
        });
        // console.log("workflow", workflow);
        requestUpdateWfDefinitionApiData(workflow);

    }
    // on update workflow
    useEffect(() => {
        if (updateWfDefinitionApiData.state === REQUEST_STATE.SUCCESS) {
            setLoading(false);
            notification.success({
                message: "Cập nhật thành công",
                duration: 1,
            })
        } else if (updateWfDefinitionApiData.state === REQUEST_STATE.ERROR) {

        } else if (updateWfDefinitionApiData.state === REQUEST_STATE.REQUEST) {
            setLoading(true);
        }
    }, [updateWfDefinitionApiData])

    /// format workflow
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 200;
    const nodeHeight = 70;
    const getLayoutedElements = (nodes, edges, direction = 'TB') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        nodes.forEach((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? 'left' : 'top';
            node.sourcePosition = isHorizontal ? 'right' : 'bottom';

            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            node.position = {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            };

            return node;
        });

        return { nodes, edges };
    };
    const onLayout = useCallback(
        (direction) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges,
                direction
            );

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges]
    );

    const onUpdateNodes = ({ nodeId, customData, description }) => {
        const newNodes = nodes.map(x => {
            if (x.id === nodeId) {
                return {
                    ...x,
                    data: {
                        ...x.data,
                        data: customData,
                        description: description
                    }
                }
            } else {
                return x;
            }
        });
       
        setNodes([...newNodes]);

        const workflow = generateWfDefinitionForApi({
            nodes: newNodes,
            edges,
            id: wfDefinition.definitionId,
            name: wfDefinition.name,
            version: wfDefinition.version
        });

        requestUpdateWfDefinitionApiData(workflow);
    }

    return (
        <AdminCommomLayout>
            <Spin size="large" spinning={loading}>
                <div >
                    <Row style={{ height: '50px', borderBottom: '1px solid #f0f0f0', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
                        <Col span={12}>

                            <Breadcrumb>
                                <Breadcrumb.Item>Workflow Definition</Breadcrumb.Item>
                                {wfDefinition && <Breadcrumb.Item href="">{wfDefinition.name}</Breadcrumb.Item>}
                            </Breadcrumb>
                        </Col>
                        <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="primary" onClick={onUpdateWorkflow} icon={<ArrowUpOutlined />} >Xuất bản</Button>

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
                        <Panel position="top-right" >

                            <Button onClick={() => onLayout('TB')}>Vertical</Button>
                            <Button onClick={() => onLayout('LR')}>Horizontal</Button>
                        </Panel>
                        <Controls showInteractive={false} />
                        <ListNodeDrawer open={openListNodeDrawer} onClose={() => { setOpenListNodeDrawer(false) }}></ListNodeDrawer>
                        <NodeDetailDrawer onUpdateNodes={onUpdateNodes} open={openNodeDetailDrawer} data={dataNodeDetail} onClose={() => { setNodeDetailDrawer(false) }}></NodeDetailDrawer>
                        <MiniMap />
                        <Background variant={BackgroundVariant.Dots} />
                    </ReactFlow>
                </div>
            </Spin>
        </AdminCommomLayout>

    );
}

