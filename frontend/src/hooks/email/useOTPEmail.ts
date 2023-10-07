import { useMutation } from "@tanstack/react-query";
import { emailOTP } from "../../data/setup";

export const useOTPEmail = (setEmailSent: any, setNotice: any) => {
    
    return useMutation(emailOTP, {
        onSuccess: async (data) => {
            setNotice('')
            setEmailSent(true)
        }
    })
}