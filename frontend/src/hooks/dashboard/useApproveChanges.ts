import { useMutation } from "@tanstack/react-query";
import { approveChanges } from "../../data/products";
import { toast } from "react-toastify";

export const useApproveChanges = () => {
    
    return useMutation(approveChanges, {
        onSuccess: async (data) => {
            window.location.reload()
        },
        onError: async (errors: any) => {
            toast.error('Something went wrong.')
        }
    })
}