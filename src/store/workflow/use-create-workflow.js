
import react, { useEffect } from "react";
import { useRecoilState } from "recoil"
import { TYPE_PRODUCT } from "../../service/type-product";
import { createWorkflowState, typeProductState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";




export const useCreateWorkflow = () => {
    const [createWorkflowData, setCreateWorkflowData] = useRecoilState(createWorkflowState);

    const request = (params) => {
        WORKFLOW.createWorkflowAsync(params, setCreateWorkflowData);
    }
    
    useEffect(() => {
        return () => {
            setCreateWorkflowData({});
            WORKFLOW.cancelCreateWorkflow();
        }
    }, [])
    return [
        createWorkflowData,
        request
    ]

}