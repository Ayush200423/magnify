import { createContext, useState } from "react";

type Credentials = {
    email: string,
    password: string,
    password2: string
}

export type LoginContextType = {
    credentials: any,
    setCredentials: any,
    loginState: boolean,
    setLoginState: any
}

type LoginContextProviderType = {
    children: React.ReactNode
}

export const LoginContext = createContext({} as LoginContextType);

export const LoginContextProvider = ({children}: LoginContextProviderType) => {

    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
        password2: ""
    });

    const [loginState, setLoginState] = useState<boolean>(false);

    return <LoginContext.Provider value={{credentials, setCredentials, loginState, setLoginState}}>{children}</LoginContext.Provider>
}