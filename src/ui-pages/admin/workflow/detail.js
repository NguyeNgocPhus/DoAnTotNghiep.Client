import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Panel, Background, Controls, MarkerType, useReactFlow, BackgroundVariant } from 'reactflow';
import { CustomEdge } from './customEdge';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Breadcrumb, Button, Col, Drawer, Row, Tabs } from 'antd';
import { AdminCommomLayout } from '../../common/layout/admin/admin-common';
import { DownloadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ListNodeDrawer } from './listNodeDrawer';
import { CustomNode } from './customNode';
import { CustomConnectionLine } from './customConnectionLine';
import { NodeDetailDrawer } from './nodeDetailDrawer';

const initialNodes = [
    { id: 'a', position: { x: 0, y: 0 }, type: 'custom-node', data: { label: 'Node A', forceToolbarVisible: false } },
    { id: 'b', position: { x: 0, y: 100 }, type: 'custom-node', data: { label: 'Node B', forceToolbarVisible: false } },
    { id: 'c', position: { x: 0, y: 200 }, type: 'custom-node', data: { label: 'Node C', forceToolbarVisible: false } },
];

// const initialEdges = [
//     { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
//     { id: 'b->c', type: 'custom-edge', source: 'b', target: 'c' },
// ];

const edgeTypes = {
    'custom-edge': CustomEdge,
};

const nodeTypes = {
    'custom-node': CustomNode,
};

let id = 1;
const getId = () => `${id++}`;
export const WorkflowDetail = () => {

    const connectingNodeId = useRef(null);
    const [openListNodeDrawer, setOpenListNodeDrawer] = useState(false);
    const [openNodeDetailDrawer, setNodeDetailDrawer] = useState(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [text, setText] = useState("");
    const { screenToFlowPosition } = useReactFlow();


    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    useEffect(() => {
        let nodes = initialNodes.map(x => {
            if (x.type === 'custom-node') {
                return { ...x, data: { ...x.data, setText: setText } }
            }
            return x;
        })
        console.log("initialNodes", nodes)

        setNodes(nodes);
        setEdges([]);
    }, []);

    // useEffect(() => {
    //     console.log("text change", text);
    // }, [text])

    // const updateNodes = () => {
    //     setNodes((nds) =>
    //         nds.map((node) => {
    //             if (node.type === 'custom-node') {
    //                 return { ...node, data: { ...node.data, label: "change +1" } }
    //             }
    //             return node;
    //         })
    //     );
    // }

    const onConnect = useCallback(
        (connection) => {
            // console.log("connection ", connection);
            // console.log("nodes", nodes);
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
        console.log("event", event);
        if (!connectingNodeId.current) return;

        const targetIsPane = event.target.classList.contains('react-flow__pane');

        if (targetIsPane) {
            // we need to remove the wrapper bounds, in order to get the correct position
            const id = getId();
            const newNode = {
                id,
                position: screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                }),
                data: { label: `Node ${id}` },
                origin: [0.5, 0.0],
            };

            // setNodes((nds) => {
            //     console.log("nds", nds.concat(newNode));
            //     return nds.concat(newNode);

            // });
            // setEdges((eds) => {
            //     console.log("eds", eds.concat({ id, source: connectingNodeId.current, target: id }));
            //     return eds.concat({ id, source: connectingNodeId.current, target: id });

            // }
            // );
        }
    }, [screenToFlowPosition]);

    const containerStyle = {
        position: 'relative',
        overflow: 'hidden',
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

    /// drag drop

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
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
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );
    const [dataNodeDetail, setDataNodeDetail] = useState({});
    const { setViewport, zoomIn, zoomOut } = useReactFlow();
    const onNodeClick = useCallback((_, node) => {
        setNodeDetailDrawer(true);
        console.log(node)
        setDataNodeDetail(node);
        setNodes((nodes) =>

            nodes.map((n) => ({
                ...n,
                className: n.id === node.id ? 'highlight' : '',
            }))
        );
        setViewport({ x: node.position.x, y: node.position.y });
    }, [setNodes, setViewport]);
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
                        <Button size='large'>Add Node</Button>
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

