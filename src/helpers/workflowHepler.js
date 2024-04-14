import { ApproveNode } from "../ui-pages/admin/workflow/nodes/actions/approve";
import { BranchNode } from "../ui-pages/admin/workflow/nodes/actions/branch";
import { ConditionNode } from "../ui-pages/admin/workflow/nodes/actions/condition";
import { FinishNode } from "../ui-pages/admin/workflow/nodes/actions/finish";
import { RejectNode } from "../ui-pages/admin/workflow/nodes/actions/reject";
import { SendEmailNode } from "../ui-pages/admin/workflow/nodes/actions/sendEmail";
import { CronNode } from "../ui-pages/admin/workflow/nodes/triggers/cron";
import { FileUploadNode } from "../ui-pages/admin/workflow/nodes/triggers/fileUpdated";
import { HttpEndpointNode } from "../ui-pages/admin/workflow/nodes/triggers/httpEndpoint";
import { v4 as uuidv4 } from 'uuid';
const nodeTypes = {
    'FileUpload': FileUploadNode,
    'HttpEndpoint': HttpEndpointNode,
    'Cron': CronNode,
    'Approve': ApproveNode,
    'Reject': RejectNode,
    'Condition': ConditionNode,
    'SendEmail': SendEmailNode,
    'Branch': BranchNode,
    'Finish': FinishNode
};

const generateWfDefinitionForApi = ({ id, name, version, nodes, edges }) => {
    console.log("nodes", nodes)
    const activities = nodes.map(node => {

        const properties = [
            {
                name: "Position",
                expressions: {
                    Literal: JSON.stringify(node.position)
                }
            },
            {
                name: "Data",
                expressions: {
                    Literal: node.data.data
                }
            },
            {
                name: "Description",
                expressions: {
                    Literal: node.data.description
                }
            }
        ];
        if (node.type === "Approve" || node.type === "Reject") {
            properties.push(
                {
                    name: "Signal",
                    expressions: {
                        Literal: uuidv4()
                    }
                }
            )
        }
        if (node.type === "Branch") {
            properties.push(
                {
                    name: "Branches",
                    expressions: {
                        Json: "[\"b1\",\"b2\",\"b3\",\"b4\"]"
                    }
                }
            )
        }
        return {
            activityId: node.id,
            category: "",
            displayName: node.data.name,
            loadWorkflowContext: false,
            persistWorkflow: false,
            propertyStorageProviders: {},
            saveWorkflowContext: false,
            type: node.type,
            properties: properties
        }
    });

    let index = 1;
    const connections = edges.map(edge => {
        let outcome = "Done";
        const activity = activities.find(x => x.activityId === edge.source);
        console.log("activity ne", activity);
        if (activity.type === "Branch") {
            outcome = `b${index}`;
            index = index + 1;
        }
        return {
            outcome: outcome,
            sourceActivityId: edge.source,
            targetActivityId: edge.target
        }
    });


    let workflow = {
        workflowDefinitionId: id,
        variables: "{}",
        version: version,
        publish: true,
        persistenceBehavior: "WorkflowBurst",
        isSingleton: false,
        deleteCompletedInstances: false,
        description: "",
        activities: activities,
        connections: connections,
        name: name,
        displayName: name
    };

    return workflow;
}
const generateWfDefinitionForUI = ({ nodes, edges }) => {

    // const initialNodes = [
    //     { id: 'a', position: { x: 0, y: 0 }, type: 'custom-node', data: { label: 'Node A', forceToolbarVisible: false } },
    //     { id: 'b', position: { x: 0, y: 100 }, type: 'custom-node', data: { label: 'Node B', forceToolbarVisible: false } },
    //     { id: 'c', position: { x: 0, y: 200 }, type: 'custom-node', data: { label: 'Node C', forceToolbarVisible: false } },
    // ];

    // const initialEdges = [
    //     { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
    //     { id: 'b->c', type: 'custom-edge', source: 'b', target: 'c' },
    // ];
    const initialNodes = nodes.map(x => {
        var position = x.properties.find(p => p.name === "Position").expressions.Literal;
        var description = x.properties.find(p => p.name === "Description")?.expressions?.Literal;
        var data = x.properties.find(p => p.name === "Data")?.expressions?.Literal;
        return {
            id: x.activityId,
            position: JSON.parse(position),
            type: x.type,
            data: {
                name: x.displayName,
                description: description,
                data: data,
                forceToolbarVisible: false
            }
        }

    });
    const initialEdges = edges.map((x, index) => {
        return {
            id: index,
            type: 'custom-edge',
            source: x.sourceActivityId,
            target: x.targetActivityId
        }
    });
    return { initialNodes, initialEdges }
}

const viewWorkflow = (nodes, edges) => {

    const activities = nodes.map(node => {

        return {
            activityId: node.id,
            category: "",
            displayName: node.data.name,
            loadWorkflowContext: false,
            persistWorkflow: false,
            propertyStorageProviders: {},
            saveWorkflowContext: false,
            type: node.type,
            properties: [
                {
                    name: "Path",
                    expressions: {
                        Literal: "/api/test"
                    }
                }
            ]
        }
    });
    const connections = edges.map(edge => {

        return {
            outcome: "DONE",
            sourceActivityId: edge.source,
            targetActivityId: edge.target
        }
    });

    let workflow = {
        workflowDefinitionId: uuidv4(),
        variables: "{}",
        publish: true,
        persistenceBehavior: "WorkflowBurst",
        isSingleton: false,
        deleteCompletedInstances: false,
        activities: activities,
        connections: connections,
        name: "oke test",
        displayName: "display name"
    };

    return workflow;
}

export {
    nodeTypes,
    generateWfDefinitionForApi,
    generateWfDefinitionForUI
}
