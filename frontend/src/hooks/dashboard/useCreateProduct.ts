import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../data/products";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateProduct = (setNotice: any) => {
    const navigate = useNavigate()
    
    return useMutation(addProduct, {
        onSuccess: async (data) => {
            navigate('/products')
            toast.success(`Successfully created product ${data?.id}`)
        },
        onError: async (errors: any) => {
            const message = JSON.parse(errors.message)
            const key = Object.keys(message)[0]
            setNotice(message[key])
        }
    })
}