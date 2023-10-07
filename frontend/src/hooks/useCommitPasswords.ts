import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { commitPasswords } from "../data/auth";

export const useCommitPasswords = (setNotice: any) => {
    const navigate = useNavigate()
    
    return useMutation(commitPasswords, {
        onSuccess: async (data) => {
            navigate('/login')
        },
        onError: async (errors: any) => {
            const message = JSON.parse(errors.message)
            const key = Object.keys(message)[0]
            setNotice(message[key])
        }
    })
}