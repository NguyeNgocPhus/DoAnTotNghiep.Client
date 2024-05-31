
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { deleteImportTemplateState } from "./share-state"
import { IMPORT_TEMPLATE } from "../../service/import-template";




export const useDeleteImportTemplate = () => {
    const [deleteImportTemplateApiData, setDeleteImportTemplateApiData] = useRecoilState(deleteImportTemplateState);

    const request = (params) => {
       
        IMPORT_TEMPLATE.deleteImportTempateAsync(params, setDeleteImportTemplateApiData);
    }
    
    useEffect(() => {
        return () => {
            setDeleteImportTemplateApiData({})
            IMPORT_TEMPLATE.cancelDeleteImportTempate();
        }
    }, [])
    return [
        deleteImportTemplateApiData,
        request
    ]

}