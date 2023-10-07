import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import VerifyContext from "./VerifyContext";
import { useOTPEmail } from "../hooks/email/useOTPEmail";
import { toast } from "react-toastify";

type AuthContextProviderType = {
    children: React.ReactNode
}

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

type AuthContextType = {
    authTokens: AuthTokensType | null,
    setLoginTokens: any,
    user: userType | null,
    logoutUser: any,
}

type AuthTokensType = {
    access: string,
    refresh: string
}

const AuthContext = createContext({} as AuthContextType)

export default AuthContext;

export const AuthContextProvider = ({children}: AuthContextProviderType) => {

    let [authTokens, setAuthTokens] = useState<AuthTokensType | null>(()=> localStorage.getItem('authTokens') ? JSON.parse(String(localStorage.getItem('authTokens'))) : null)
    let [user, setUser] = useState<userType|null>(()=> localStorage.getItem('authTokens') ? jwt_decode(String(localStorage.getItem('authTokens'))) : null)
    let [loading, setLoading] = useState(true)

    const setTokens = (data: AuthTokensType) => {
        setUser(jwt_decode(data.access))
        setAuthTokens(data)
        localStorage.setItem('authTokens', JSON.stringify(data))
    }

    const setLoginTokens = (data: AuthTokensType) => {
        setTokens(data)
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async ()=> {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh': authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setTokens(data)
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=> {

        let fourMinutes = 1000 * 60 * 4

        if (loading) {
            updateToken()
        }

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return <AuthContext.Provider value={{authTokens, setLoginTokens, user, logoutUser,}}>{children}</AuthContext.Provider>
}