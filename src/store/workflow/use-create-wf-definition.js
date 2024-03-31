
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { createWfDefinitionState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";




export const useCreateWfDefinition = () => {
    const [createWfDefinitionApiData, setCreateWfDefinitionApiData] = useRecoilState(createWfDefinitionState);

    const request = (params) => {
        WORKFLOW.createWfDefinitionAsync(params, setCreateWfDefinitionApiData);
    }
    
    useEffect(() => {
        return () => {
            setCreateWfDefinitionApiData({});
            WORKFLOW.cancelCreateWfDefinition();
        }
    }, [])
    return [
        createWfDefinitionApiData,
        request
    ]

}