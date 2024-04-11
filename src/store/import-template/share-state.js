import {atom} from "recoil";

export const createImportTemplateState = atom({
    key:"CREATE-IMPORT-TEMPLATE-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
export const updateImportTemplateState = atom({
    key:"UPDATE-IMPORT-TEMPLATE-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
export const deleteImportTemplateState = atom({
    key:"DELETE-IMPORT-TEMPLATE-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
export const getListImportTemplateState = atom({
    key:"GET-LIST-IMPORT-TEMPLATE-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})
export const getImportTemplateState = atom({
    key:"GET-IMPORT-TEMPLATE-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})