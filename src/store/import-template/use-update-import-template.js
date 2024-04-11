
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { updateImportTemplateState } from "./share-state"
import { IMPORT_TEMPLATE } from "../../service/import-template";




export const useUpdateImportTemplate = () => {
    const [updateImportTemplateApiData, setUpdateImportTemplateApiData] = useRecoilState(updateImportTemplateState);

    const request = (params) => {
        IMPORT_TEMPLATE.updateImportTempateAsync(params, setUpdateImportTemplateApiData);
    }
    
    useEffect(() => {
        return () => {
            // setUpdateImportTemplateApiData({});
            IMPORT_TEMPLATE.cancelUpdateImportTempate();
        }
    }, [])
    return [
        updateImportTemplateApiData,
        request
    ]

}