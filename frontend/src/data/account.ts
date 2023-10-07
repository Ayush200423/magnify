export const getAccount = async (access: string) => {
    const response = await fetch(`http://localhost:8000/accounts/view/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
        }
    })

    const data = await response.json()
    return data
}