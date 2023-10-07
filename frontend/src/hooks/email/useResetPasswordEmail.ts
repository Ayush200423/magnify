import { useMutation } from "@tanstack/react-query";
import { emailForgotPassword } from "../../data/auth";

export const useResetPasswordEmail = (setNotice: any, setSent: any) => {
    
    return useMutation(emailForgotPassword, {
        onSuccess: () => {
            setNotice('')
            setSent(true)
        },
        onError: async (errors: any) => {
            const message = JSON.parse(errors.message)
            console.log(message)
            const key = Object.keys(message)[0]
            setNotice(message[key])
        }
    })
}