import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../../data/setup";
import { useLogin } from "./useLogin";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";

export const useVerifyOTP = (setEmailSent: any, setNotice: any) => {
    const { mutate: mutateLogin } = useLogin(setNotice)
    const { setLoginState } = useContext(LoginContext)
    
    return useMutation(verifyOTP, {
        onSuccess: async (data, params) => {
            setLoginState(true)
            mutateLogin(params.credentials)
        },
        onError: async (errors: any) => {
            const message = JSON.parse(errors.message)
            const key = Object.keys(message)[0]
            setEmailSent(false)
            setNotice(message[key])
        }
    })
}