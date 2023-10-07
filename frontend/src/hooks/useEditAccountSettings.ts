import { useMutation } from "@tanstack/react-query";
import { setupAccountSettings } from "../data/setup";
import { toast } from "react-toastify";

export const useEditAccountSettings = (setNotice: any) => {
    return useMutation(setupAccountSettings, {
        onSuccess: () => {
            toast.success('Successfully edited account details.')
        },
        onError: async (errors: any) => {
            console.log('error!', errors.message)
            const message = JSON.parse(errors.message)["Errors"]
            const key = Object.keys(message)[0]
            setNotice(message[key][0])
        }
    })
}