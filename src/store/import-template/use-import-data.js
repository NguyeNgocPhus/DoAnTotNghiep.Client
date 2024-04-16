
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { importDataState } from "./share-state"
import { IMPORT_TEMPLATE } from "../../service/import-template";




export const useImportData = () => {
    const [importApiData, setImportApiData] = useRecoilState(importDataState);

    const request = (params) => {
        IMPORT_TEMPLATE.importDataAsync(params, setImportApiData);
    }
    
    useEffect(() => {
        return () => {
            // setUpdateImportTemplateApiData({});
            IMPORT_TEMPLATE.cancelApiImportData();
        }
    }, [])
    return [
        importApiData,
        request
    ]

}