import {atom} from "recoil";

export const createWorkflowState = atom({
    key:"CREATE-WORKFLOW-STATE",
    default:{
        data:[],
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