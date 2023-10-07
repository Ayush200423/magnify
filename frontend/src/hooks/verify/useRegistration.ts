import { useMutation } from "@tanstack/react-query";
import { addUser } from "../../data/auth";
import { useLogin } from "./useLogin";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

export const useRegistration = (setNotice: any) => {
    const { mutate } = useLogin(setNotice)
    const { setLoginState } = useContext(LoginContext)

    return useMutation(addUser, {
        onSuccess: async (data, params) => {
            setLoginState(true)
            mutate(params)
        },
        onError: async (errors: any) => {
            const message = JSON.parse(errors.message)["Errors"]
            const key = Object.keys(message)[0]
            setNotice(message[key][0])
        }
    })
}