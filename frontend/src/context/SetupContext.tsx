import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { LoginContext } from "./LoginContext";
import { useEditAccountFree } from "../hooks/useEditAccountFree";

type Credentials = {
    email: string,
    password: string,
    password2: string
}

export type SetupContextType = {
    handleOnClickFree: any,
    notice: string,
    setNotice: any,
    duration: string,
    setDuration: any
}

type SetupContextProviderType = {
    children: React.ReactNode
}

export const SetupContext = createContext({} as SetupContextType);

export const SetupContextProvider = ({children}: SetupContextProviderType) => {

    const [duration, setDuration] = useState<string>("30")
    const { authTokens } = useContext(AuthContext)
    const { credentials } = useContext(LoginContext)
    const [notice, setNotice] = useState<string>('')

    const { mutate: mutateEditAccountFree } = useEditAccountFree(setNotice)

    const handleOnClickFree = () => {
        mutateEditAccountFree({
            'access': authTokens?.access!,
            'update_duration': duration,
            'website': '',
            'credentials': credentials
        });
    }

    return <SetupContext.Provider value={{handleOnClickFree, notice, setNotice, duration, setDuration}}>{children}</SetupContext.Provider>
}