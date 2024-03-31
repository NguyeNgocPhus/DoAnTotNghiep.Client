import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Panel, Background, Controls, MarkerType, useReactFlow, BackgroundVariant } from 'reactflow';
import { CustomEdge } from '../customEdge';
import "./styles.css";
import 'reactflow/dist/style.css';
import { Breadcrumb, Button, Col, Row } from 'antd';
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
// const initialNodes = [
//     { id: 'a', position: { x: 0, y: 0 }, type: 'custom-node', data: { label: 'Node A', forceToolbarVisible: false } },
//     { id: 'b', position: { x: 0, y: 100 }, type: 'custom-node', data: { label: 'Node B', forceToolbarVisible: false } },
//     { id: 'c', position: { x: 0, y: 200 }, type: 'custom-node', data: { label: 'Node C', forceToolbarVisible: false } },
// ];

// const initialEdges = [
//     { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
//     { id: 'b->c', type: 'custom-edge', source: 'b', target: 'c' },
// ];

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
export const WorkflowDetail = (props) => {

    const { id } = useParams()
    const connectingNodeId = useRef(null);

    const [wfDefinitionApiData, requestWfDefinitionApiData] = useGetWfDefinition();
    const [updateWfDefinitionApiData, requestUpdateWfDefinitionApiData] = useUpdateWfDefinition();


    const [wfDefinition, setWorklfowDefinition] = useState({});

    const [openListNodeDrawer, setOpenListNodeDrawer] = useState(false);
    const [openNodeDetailDrawer, setNodeDetailDrawer] = useState(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { screenToFlowPosition } = useReactFlow();


    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    useEffect(() => {
        setNodes([]);
        setEdges([]);
        
        requestWfDefinitionApiData({id});
    }, []);
    useEffect(()=>{
        if (wfDefinitionApiData.state === REQUEST_STATE.SUCCESS) {
            console.log('wfDefinitionApiData',wfDefinitionApiData.data)
            setWorklfowDefinition(wfDefinitionApiData.data);
            const { initialNodes, initialEdges } = generateWfDefinitionForUI({
                nodes: wfDefinitionApiData.data.activities,
                edges: wfDefinitionApiData.data.connections,
            })
            setNodes([...initialNodes]);
            setEdges([...initialEdges]);


        } else if (wfDefinitionApiData.state === REQUEST_STATE.ERROR) {

        } else if (wfDefinitionApiData.state === REQUEST_STATE.REQUEST) {

        }
    },[wfDefinitionApiData]);


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
    const onUpdateWorkflow = () => {
        const workflow = generateWfDefinitionForApi({
            nodes,
            edges,
            id: wfDefinition.definitionId,
            name: wfDefinition.name,
            version: wfDefinition.version
        });
        console.log("workflow",workflow);
        requestUpdateWfDefinitionApiData(workflow);

    }
    useEffect(()=>{
        console.log("updateWfDefinitionApiData",updateWfDefinitionApiData);
    },[updateWfDefinitionApiData])

    
    return (
        <AdminCommomLayout>
            
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

