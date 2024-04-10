 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getNodeDefinitionState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";


export const useGetNodeDefinition = () => {
    const [nodeDefinitionApiData, setNodeDefinitionApiData] = useRecoilState(getNodeDefinitionState);

    const request = (params) => {
        WORKFLOW.getNodeDefinitionAsync(params, setNodeDefinitionApiData);
    }
    
    useEffect(() => {
        return () => {
            WORKFLOW.cancelApiGetNodeDefinition();
        }
    }, [])
    return [
        nodeDefinitionApiData,
        request
    ]

}