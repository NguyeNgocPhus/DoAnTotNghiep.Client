import { useRecoilState } from "recoil"
import { productState } from "./share-state"
import { useEffect } from "react";
import { PRODUCT } from "../../service/product";



export const useGetAllProduct = () => {
    const [listProduct, setListProduct] = useRecoilState(productState);

    const request = (params) => {
        PRODUCT.getAllProduct(params, setListProduct);
    }

    useEffect(() => {
        return () => {
            // setListProduct({});
            PRODUCT.cancelapiGetAllProduct();
        }
    }, [])

    return [
        listProduct,
        request
    ]
}