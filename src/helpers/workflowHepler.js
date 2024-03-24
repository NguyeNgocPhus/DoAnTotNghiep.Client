import { ApproveNode } from "../ui-pages/admin/workflow/nodes/actions/approve";
import { BranchNode } from "../ui-pages/admin/workflow/nodes/actions/branch";
import { ConditionNode } from "../ui-pages/admin/workflow/nodes/actions/condition";
import { RejectNode } from "../ui-pages/admin/workflow/nodes/actions/reject";
import { SendEmailNode } from "../ui-pages/admin/workflow/nodes/actions/sendEmail";
import { CronNode } from "../ui-pages/admin/workflow/nodes/triggers/cron";
import { FileUploadNode } from "../ui-pages/admin/workflow/nodes/triggers/fileUpdated";
import { HttpEndpointNode } from "../ui-pages/admin/workflow/nodes/triggers/httpEndpoint";

const nodeTypes = {
    'FileUpload': FileUploadNode,
    'HttpEndpoint': HttpEndpointNode,
    'Cron': CronNode,
    'Approve': ApproveNode,
    'Reject': RejectNode,
    'Condition': ConditionNode,
    'SendEmail': SendEmailNode,
    'Branch':BranchNode
};

const createWorkflow = (nodes, edges) =>{

    let workflow = {};
    
}

export {
    nodeTypes
}
