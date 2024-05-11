 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { executeWfPedingState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";


export const useExecuteWfPeding = () => {
    const [executeWf, setExecuteWf] = useRecoilState(executeWfPedingState);

    const request = (params) => {
        WORKFLOW.executeWfAsync(params, setExecuteWf);
    }
    
    useEffect(() => {
        return () => {
            WORKFLOW.cancelApiExecuteWf();
            setExecuteWf({});
        }
    }, [])
    return [
        executeWf,
        request
    ]

}