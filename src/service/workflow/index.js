import moment from "moment";
import { REQUEST_STATE } from "../../app-config/constants"
import { apiCreateWfDefinition, cancelApiCreateWfDefinition } from "../../data-source/workflow/create-wf-definition";
import { apiDeleteWfDefinition, cancelApiDeleteWfDefinition } from "../../data-source/workflow/delete-wf-definition";
import { apiGetListWfDefinition, cancelApiGetListWfDefinition } from "../../data-source/workflow/get-list-wf-definition";
import { apiGetNodeDefinition, cancelApiGetNodeDefinition } from "../../data-source/workflow/get-node-definition";
import { apiGetWorkflowActivity, cancelApiGetWorkflowActivity } from "../../data-source/workflow/get-wf-activity";
import { apiGetWfDefinition, cancelApiGetWfDefinition } from "../../data-source/workflow/get-wf-definition";
import { apiUpdateWfDefinition, cancelApiUpdateWfDefinition } from "../../data-source/workflow/update-wf-definition";
import { cancelApiGetCurrentStepWf, apiCurrentStepWf } from "../../data-source/workflow/get-current-step-wf";
import { apiExecuteWf, cancelApiExecuteWf } from "../../data-source/workflow/execute-wf-pending";




export const WORKFLOW = {
    // create workflow definition
    cancelCreateWfDefinition: cancelApiCreateWfDefinition,
    createWfDefinitionAsync: function (params, setCreateWfDefinitionData) {
        setCreateWfDefinitionData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiCreateWfDefinition(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setCreateWfDefinitionData(response);
            }
        });
    },

    // update workflow definition
    cancelUpdateWfDefinition: cancelApiUpdateWfDefinition,
    updateWfDefinitionAsync: function (params, setUpdateWfDefinitionData) {
        setUpdateWfDefinitionData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiUpdateWfDefinition(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setUpdateWfDefinitionData(response);
            }
        });
    },

    // delete workflow definition
    cancelDeleteWfDefinition: cancelApiDeleteWfDefinition,
    deleteWfDefinitionAsync: function (params, setDeleteWfDefinitionData) {
        setDeleteWfDefinitionData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiDeleteWfDefinition(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setDeleteWfDefinitionData(response);
            }
        });
    },


    // get list workflow definition
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

    // get workflow definition
    cancelGetWfDefinition: cancelApiGetWfDefinition,
    getWfDefinitionAsync: function (params, setWfDefinitionData) {
        setWfDefinitionData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetWfDefinition(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setWfDefinitionData(response);
            }
        });
    },
    // get node workflow definition
    cancelApiGetNodeDefinition: cancelApiGetNodeDefinition,
    getNodeDefinitionAsync: function (params, setNodeDefinitionData) {
        setNodeDefinitionData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetNodeDefinition(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setNodeDefinitionData(response);
            }
        });
    },

    // get workflow activity
    cancelApiGetWorkflowActivity: cancelApiGetWorkflowActivity,
    getWorkflowActivityAsync: function (params, setWorkflowActivity) {
        setWorkflowActivity({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetWorkflowActivity(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {

                setWorkflowActivity(response);
            }
        });
    },

    // get current step wf
    cancelApiGetCurrentStepWf: cancelApiGetCurrentStepWf,
    getCurrentStepWfAsync: function (params, setCurrentStepWf) {
        setCurrentStepWf({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiCurrentStepWf(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {

                setCurrentStepWf(response);
            }
        });
    },

    // execute wf
    cancelApiExecuteWf: cancelApiExecuteWf,
    executeWfAsync: function (params, setExecuteWf) {
        setExecuteWf({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiExecuteWf(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {

                setExecuteWf(response);
            }
        });
    },


}