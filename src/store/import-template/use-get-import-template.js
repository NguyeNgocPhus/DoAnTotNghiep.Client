 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getImportTemplateState } from "./share-state"
import { IMPORT_TEMPLATE } from "../../service/import-template";


export const useGetImportTemplate = () => {
    const [importTemplateApiData, setImportTemplateApiData] = useRecoilState(getImportTemplateState);

    const request = (params) => {
        IMPORT_TEMPLATE.getImportTempateAsync(params, setImportTemplateApiData);
    }
    
    useEffect(() => {
        return () => {
            IMPORT_TEMPLATE.cancelGetImportTempate();
        }
    }, [])
    return [
        importTemplateApiData,
        request
    ]

}