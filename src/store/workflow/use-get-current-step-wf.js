 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getCurrentStepWfState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";


export const useGetCurrentStepWf = () => {
    const [currentStepWf, setCurrentStepWf] = useRecoilState(getCurrentStepWfState);

    const request = (params) => {
        WORKFLOW.getCurrentStepWfAsync(params, setCurrentStepWf);
    }
    
    useEffect(() => {
        return () => {
            WORKFLOW.cancelApiGetCurrentStepWf();
        }
    }, [])
    return [
        currentStepWf,
        request
    ]

}