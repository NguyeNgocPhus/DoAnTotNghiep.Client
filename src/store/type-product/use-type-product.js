
import react ,{useEffect} from "react";
import { useRecoilState } from "recoil"
import { TYPE_PRODUCT } from "../../service/type-product";
import { typeProductState } from "./share-state"




export const useTypeProduct = () =>{
    const [listTypeProduct,setListTypeProduct] = useRecoilState(typeProductState);

    const request = (params) =>{
        TYPE_PRODUCT.getAllTypeProduct(setListTypeProduct);
    }
    useEffect(()=>{
        return ()=>{
            // setListTypeProduct({});
            TYPE_PRODUCT.cancelapiGetAllTypeProduct() 
        }
    },[])
    return [
        listTypeProduct,
        request
    ]

}