 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getWorkflowActivityState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";


export const useGetWorkflowActivity = () => {
    const [workflowActivityData, setWorkflowActivityData] = useRecoilState(getWorkflowActivityState);

    const request = (params) => {
        WORKFLOW.getWorkflowActivityAsync(params, setWorkflowActivityData);
    }
    
    useEffect(() => {
        return () => {
            WORKFLOW.cancelApiGetWorkflowActivity();
        }
    }, [])
    return [
        workflowActivityData,
        request
    ]

}