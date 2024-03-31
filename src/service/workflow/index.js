import { REQUEST_STATE } from "../../app-config/constants"
import { apiCreateWorkflow, cancelApiCreateWorkflow } from "../../data-source/workflow/create-workflow";
import { apiGetListWfDefinition, cancelApiGetListWfDefinition } from "../../data-source/workflow/get-list-wf-definition";




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

    cancelGetListWfDefinition: cancelApiGetListWfDefinition,
    getListWfDefinitionAsync: function (params, setListWfDefinitionData) {
        setListWfDefinitionData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetListWfDefinition(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setListWfDefinitionData(response);
            }
        });
    },



}