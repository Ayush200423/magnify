import { useMutation } from "@tanstack/react-query";
import { setupFreeAccount } from "../data/setup";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

export const useEditAccountFree = (setNotice: any) => {
    const { setLoginState } = useContext(LoginContext)

    return useMutation(setupFreeAccount, {
        onSuccess: () => {
            setLoginState(false)
        },
        onError: async (errors: any) => {
            const message = JSON.parse(errors.message)["Errors"]
            const key = Object.keys(message)[0]
            setNotice(message[key][0])
        }
    })
}