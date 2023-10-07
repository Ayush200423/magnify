import { createContext, useState } from "react";

type Product = {
    id: string,
    name: string,
    min: number | null,
    max: number | null,
    cost: number | null,
    current: number | null,
    staging: number | null
}

export type ProductContextType = {
    product: any,
    setProduct: any
}

type ProductContextProviderType = {
    children: React.ReactNode
}

export const ProductContext = createContext({} as ProductContextType);

export const ProductContextProvider = ({children}: ProductContextProviderType) => {

    const [product, setProduct] = useState<Product>({
        id: "",
        name: "",
        min: null,
        max: null,
        cost: null,
        current: null,
        staging: null
    });

    return <ProductContext.Provider value={{product, setProduct}}>{children}</ProductContext.Provider>
}