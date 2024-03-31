
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { deleteWfDefinitionState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";




export const useDeleteWfDefinition = () => {
    const [deleteWfDefinitionApiData, setDeleteWfDefinitionApiData] = useRecoilState(deleteWfDefinitionState);

    const request = (params) => {
        WORKFLOW.deleteWfDefinitionAsync(params, setDeleteWfDefinitionApiData);
    }
    
    useEffect(() => {
        return () => {
            WORKFLOW.cancelDeleteWfDefinition();
        }
    }, [])
    return [
        deleteWfDefinitionApiData,
        request
    ]

}