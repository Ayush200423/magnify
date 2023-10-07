import { createContext, useState } from "react";

type VerifyContextProviderType = {
    children: React.ReactNode
}

type VerifyContextType = {
    notice: string,
    setNotice: any,
    emailSent: boolean,
    setEmailSent: any
}

const VerifyContext = createContext({} as VerifyContextType)

export default VerifyContext;

export const VerifyContextProvider = ({children}: VerifyContextProviderType) => {

    const [notice, setNotice] = useState<string>('');
    const [emailSent, setEmailSent] = useState<boolean>(true);

    return <VerifyContext.Provider value={{notice, setNotice, emailSent, setEmailSent}}>{children}</VerifyContext.Provider>
}