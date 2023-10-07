import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { LoginContext } from "./LoginContext";
import { useEditAccountFree } from "../hooks/useEditAccountFree";
import { getAccount } from "../data/account";
import { useQuery } from "@tanstack/react-query";
import { useEditAccountSettings } from "../hooks/useEditAccountSettings";

type accountDataType = {
    website: string | null,
    plan: "FREE" | "PREMIUM" | "PROFESSIONAL" | "BUSINESS",
    email: string,
    update_duration: string,
    next_update: string,
    verified: boolean,
    approval_required: boolean,
    num_remaining_products: number,
    num_max_products: number,
    price_change_limit: number
}

export type AccountContextType = {
    accountData: accountDataType,
    isLoadingAccountData: boolean,
    isSuccessAccountData: boolean,
    refetchAccountData: any,
    mutateEditAccountSettings: any,
    isLoadingSave: boolean,
    notice: string,
    setNotice: any
}

type AccountContextProviderType = {
    children: React.ReactNode
}

export const AccountContext = createContext({} as AccountContextType);

export const AccountContextProvider = ({children}: AccountContextProviderType) => {

    const { authTokens } = useContext(AuthContext)
    const [notice, setNotice] = useState<string>('')
    
    const { data: accountData, isLoading: isLoadingAccountData, isSuccess: isSuccessAccountData, refetch: refetchAccountData } = useQuery({
    queryKey: ["account", authTokens?.access!],
    queryFn: () => getAccount(authTokens?.access!)
    })

    const { mutateAsync: mutateEditAccountSettings, isLoading: isLoadingSave } = useEditAccountSettings(setNotice)

    return <AccountContext.Provider value={{accountData, isLoadingAccountData, isSuccessAccountData, refetchAccountData, mutateEditAccountSettings, isLoadingSave, notice, setNotice}}>{children}</AccountContext.Provider>
}