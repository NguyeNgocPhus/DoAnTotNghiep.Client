import {atom} from "recoil";

export const createWfDefinitionState = atom({
    key:"CREATE-WF-DEFINITION-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
export const updateWfDefinitionState = atom({
    key:"UPDATE-WF-DEFINITION-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
export const deleteWfDefinitionState = atom({
    key:"DELETE-WF-DEFINITION-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
export const getListWfDefinitionState = atom({
    key:"GET-LIST-WF-DEFINITION-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})
export const getWorkflowActivityState = atom({
    key:"GET-WORKFLOW-ACTIVITY-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})
export const getCurrentStepWfState = atom({
    key:"GET-CURRENT-STEP-WF-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})
export const executeWfPedingState = atom({
    key:"EXECUTE-WF-PENDING-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})
export const getWfDefinitionState = atom({
    key:"GET-WF-DEFINITION-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})
export const getNodeDefinitionState = atom({
    key:"GET-NODE-DEFINITION-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})