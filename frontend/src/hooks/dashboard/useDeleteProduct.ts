import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../../data/products";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
    const navigate = useNavigate()
    
    return useMutation(deleteProduct, {
        onSuccess: async (data) => {
            navigate('/products')
            toast.success(`Successfully deleted product.`)
        },
        onError: async (errors: any) => {
            const message = JSON.parse(errors.message)
            console.log(message)
        }
    })
}