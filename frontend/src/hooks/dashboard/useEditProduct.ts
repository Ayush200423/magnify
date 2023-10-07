import { useMutation } from "@tanstack/react-query";
import { editProduct } from "../../data/products";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useEditProduct = (setNotice: any) => {
    const navigate = useNavigate()
    
    return useMutation(editProduct, {
        onSuccess: async (data) => {
            navigate('/products')
            toast.success(`Successfully edited product ${data?.id}`)
        },
        onError: async (errors: any) => {
            const message = JSON.parse(errors.message)
            const key = Object.keys(message)[0]
            setNotice(message[key])
        }
    })
}