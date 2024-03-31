 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { createWorkflowState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";


export const useGetListWfDefinition = () => {
    const [listWfDefinitionData, setListWfDefinitionData] = useRecoilState(createWorkflowState);

    const request = (params) => {
        WORKFLOW.getListWfDefinitionAsync(params, setListWfDefinitionData);
    }
    
    useEffect(() => {
        return () => {
            WORKFLOW.cancelGetListWfDefinition();
        }
    }, [])
    return [
        listWfDefinitionData,
        request
    ]

}