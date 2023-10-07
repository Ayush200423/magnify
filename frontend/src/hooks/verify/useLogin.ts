import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../../data/auth";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useOTPEmail } from "../email/useOTPEmail";
import VerifyContext from "../../context/VerifyContext";
import jwt_decode from "jwt-decode";
import { LoginContext } from "../../context/LoginContext";

type userType = {
    email: string, 
    exp: number,
    iat: number,
    jti: string,
    token_type: string,
    user_id: number,
    verified: boolean,
    active: boolean
}

export const useLogin = (setNotice: any) => {
    const { setLoginTokens, logoutUser } = useContext(AuthContext)
    const { setNotice: setVerifyNotice, setEmailSent } = useContext(VerifyContext)
    const { mutateAsync: emailMutate } = useOTPEmail(setEmailSent, setVerifyNotice)
    const { setLoginState } = useContext(LoginContext)
    
    return useMutation(authenticateUser, {
        onSuccess: async (data) => {
            const user: userType = jwt_decode(data.access)

            if (!user.verified) {
                setLoginState(true)
                emailMutate(data.access)
            } else if (!user.active) {
                setLoginState(true)
            } else {
                setLoginState(false)
            }
            
            setLoginTokens(data)
        },
        onError: () => {
            logoutUser()
            setNotice("Authentication failed")
        }
    })
}