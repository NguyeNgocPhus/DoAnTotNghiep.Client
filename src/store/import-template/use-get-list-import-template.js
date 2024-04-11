 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getListImportTemplateState } from "./share-state"
import { WORKFLOW } from "../../service/workflow";
import { IMPORT_TEMPLATE } from "../../service/import-template";


export const useGetListImportTemplate  = () => {
    const [listImportTemplateData, setListImportTemplateData] = useRecoilState(getListImportTemplateState);

    const request = (params) => {
        IMPORT_TEMPLATE.getListImportTempateAsync(params, setListImportTemplateData);
    }
    
    useEffect(() => {
        return () => {
            IMPORT_TEMPLATE.cancelGetListImportTempate();
        }
    }, [])
    return [
        listImportTemplateData,
        request
    ]

}