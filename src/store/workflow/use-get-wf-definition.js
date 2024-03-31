 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getWfDefinitionState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";


export const useGetWfDefinition = () => {
    const [wfDefinitionApiData, setWfDefinitionApiData] = useRecoilState(getWfDefinitionState);

    const request = (params) => {
        WORKFLOW.getWfDefinitionAsync(params, setWfDefinitionApiData);
    }
    
    useEffect(() => {
        return () => {
            WORKFLOW.cancelGetWfDefinition();
        }
    }, [])
    return [
        wfDefinitionApiData,
        request
    ]

}