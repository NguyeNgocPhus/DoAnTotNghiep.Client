
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { updateWfDefinitionState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";




export const useUpdateWfDefinition = () => {
    const [updateWfDefinitionApiData, setUpdateWfDefinitionApiData] = useRecoilState(updateWfDefinitionState);

    const request = (params) => {
        WORKFLOW.updateWfDefinitionAsync(params, setUpdateWfDefinitionApiData);
    }
    
    useEffect(() => {
        return () => {
            setUpdateWfDefinitionApiData({});
            WORKFLOW.cancelUpdateWfDefinition();
        }
    }, [])
    return [
        updateWfDefinitionApiData,
        request
    ]

}