import React from "react"
import { useContext } from "react"

interface IUserContext {
    user: string | null,
    setUser: React.Dispatch<React.SetStateAction<string | null>> | null
}

export const UserContext = React.createContext<IUserContext>({
    user: null,
    setUser: null,
})
export const UserContextProvider = UserContext.Provider

export function useUser() {
    return useContext(UserContext)
}