import { ApproveNode } from "../ui-pages/admin/workflow/nodes/actions/approve";
import { BranchNode } from "../ui-pages/admin/workflow/nodes/actions/branch";
import { ConditionNode } from "../ui-pages/admin/workflow/nodes/actions/condition";
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
    'Branch': BranchNode
};

const generateWfDefinition = ({id, name, version ,nodes,edges}) => {

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
        workflowDefinitionId: id,
        variables: "{}",
        version : version,
        publish: true,
        persistenceBehavior: "WorkflowBurst",
        isSingleton: false,
        deleteCompletedInstances: false,
        description :"",
        activities: activities,
        connections: connections,
        name: name,
        displayName: name
    };

    return workflow;
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
    generateWfDefinition
}
