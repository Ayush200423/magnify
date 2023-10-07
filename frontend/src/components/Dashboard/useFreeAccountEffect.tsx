import { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { getAccount } from "../../data/account"
import { LoginContext } from "../../context/LoginContext"
import { SetupContext } from "../../context/SetupContext"

export const useFreeAccountEffect = () => {
    const { handleOnClickFree, setDuration } = useContext(SetupContext)
    const { authTokens } = useContext(AuthContext)
    const { setLoginState } = useContext(LoginContext)
    
    const { data: accountData, isSuccess } = useQuery({
        queryKey: ["account", authTokens?.access!],
        queryFn: () => getAccount(authTokens?.access!)
    })

    useEffect(() => {
        setLoginState(false)
        if (isSuccess && accountData && !accountData?.plan) {
            setDuration("30")
            handleOnClickFree()
        }
    }, [isSuccess, authTokens?.access])
}