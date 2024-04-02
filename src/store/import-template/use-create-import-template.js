import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { createImportTemplateState } from "./share-state"
import { IMPORT_TEMPLATE } from "../../service/import-template";




export const useCreateImportTemplate = () => {
    const [createImportTemplateApiData, setCreateImportTemplateApiData] = useRecoilState(createImportTemplateState);

    const request = (params) => {
        IMPORT_TEMPLATE.createImportTempateAsync(params, setCreateImportTemplateApiData);
    }
    
    useEffect(() => {
        return () => {
            setCreateImportTemplateApiData({});
            IMPORT_TEMPLATE.cancelApiCreateImportTemplate();
        }
    }, [])
    return [
        createImportTemplateApiData,
        request
    ]

}