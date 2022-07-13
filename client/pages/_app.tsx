import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar"
import { UserContext, UserContextProvider } from "../context/UserContext"
import { useContext, useEffect, useState } from 'react'
import { authFetcher } from '../utils/fetcher'
import { getAccessToken } from '../utils/user'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    async function getUser() {
      try {
        const res = await authFetcher({
          method: "get",
          url: `${process.env.API_ROUTE}/auth`
        })
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  return (
    //@ts-ignore
    < UserContextProvider value={{ user, setUser }}>
      <NextNProgress />
      <Component {...pageProps} />
    </ UserContextProvider>
  )
}

export default MyApp
