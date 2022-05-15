import React from "react"
export const UserContext = React.createContext({
    user: null,
    setUser: () => { },
})
export const UserContextProvider = UserContext.Provider