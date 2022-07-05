import { motion } from "framer-motion"
import { useContext, useState } from "react"
import Layout from "../../components/Layout"
import axios from "axios"
import validator from "validator"
import Link from "next/link"
import { useRouter } from "next/router"
import { saveAccessToken } from "../../utils/user"
import { UserContext } from "../../context/UserContext"

export default function LoginForm() {
    const { user, setUser } = useContext(UserContext)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [emailIsValid, setEmailIsValid] = useState(true)
    const router = useRouter()

    function isEmailValid() {
        if (!validator.isEmail(email)) {
            setEmailIsValid(false)
            return false
        } else {
            setEmailIsValid(true)
            return true
        }
    }
    function isPasswordValid() {
        if (password.length >= 6) {
            setEmailIsValid(true)
            return true
        } else {
            setEmailIsValid(false)
            return false
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!(isEmailValid() && isPasswordValid())) return
        try {
            const res = await axios.post(process.env.API_ROUTE + "/auth/login", {
                email,
                password,
            })
            console.log(res.data)
            setUser(res.data)
            saveAccessToken(res.data)
            router.push("/")
        } catch (error) {
            console.log("Error occured")
            console.log(error)
        }
    }

    return (
        <Layout>
            <div style={{ height: "calc(100vh - 90px)" }} className="w-full top-0 flex justify-center items-center z-50">
                <motion.div
                    style={{ background: "linear-gradient(to bottom, #192133, #111826)" }}
                    className="bg-slate-700 w-96 h-96 rounded-md px-12 py-8"
                    animate={{ y: [15, -5], opacity: [0, 1] }}
                    transition={{ duration: .4 }}
                >
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h1 className="text-2xl mb-3 font-semi-bold">Login</h1>
                        <div className="my-8 px-2">
                            <input
                                style={{ borderBottomWidth: "1px" }}
                                className="w-full bg-transparent border-brand-blue focus:outline-none"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {!emailIsValid && <span className="text-sm text-red-400">Please enter a valid email</span>}
                        </div>
                        <div className="my-8 px-2">
                            <input
                                style={{ borderBottomWidth: "1px" }}
                                className="w-full bg-transparent border-brand-blue focus:outline-none"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter a password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full h-12 mt-4 bg-brand-blue rounded-sm">
                            CONTINUE
                        </button>
                        <span className="text-center w-full block mt-3">Or <Link href="/register"><a className="underline">register</a></Link> instead!</span>
                    </form>
                </motion.div>
            </div >
        </Layout>
    )
}