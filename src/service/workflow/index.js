import { REQUEST_STATE } from "../../app-config/constants"
import { apiCreateWorkflow, cancelApiCreateWorkflow } from "../../data-source/workflow/create-workflow";




export const WORKFLOW = {
    cancelCreateWorkflow: cancelApiCreateWorkflow,
    createWorkflowAsync: function (params, setCreateWorkflowData) {
        setCreateWorkflowData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiCreateWorkflow(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setCreateWorkflowData(response);
            }
        });
    },



}