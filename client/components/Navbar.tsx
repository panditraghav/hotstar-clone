import Image from "next/image";
import logo from "../public/logo-dark.svg";
import Search from "../components/Search";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRouter } from "next/router"
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { removeAccessToken } from "../utils/user";

interface Props {
    menuItems: JSX.Element
}

export default function NavBar(props: Props) {
    const router = useRouter();
    const { user, setUser } = useUser()
    const [isUserMenuVisible, setIsUserMenuVisible] = useState(false)

    function toggleUserMenu() {
        setIsUserMenuVisible(!isUserMenuVisible)
    }

    function handleLogout() {
        //@ts-ignore
        setUser(null)
        removeAccessToken()
    }

    return (
        <nav className="bg-brand-dark-blue h-[72px] flex items-center px-16 justify-between mb-4 sticky top-0 z-50 text-white">
            <div className="flex justify-center items-center">
                <div className="flex flex-col h-3 justify-between mt-2 mr-4">
                    <div className="w-4 h-[2px] bg-gray-400"></div>
                    <div className="w-4 h-[2px] bg-gray-400"></div>
                    <div className="w-4 h-[2px] bg-gray-400"></div>
                </div>
                <Link href="/">
                    <a href="">
                        <Image alt={"Hotstar logo"} className="cursor-pointer" src={logo} width={115} height={42} />
                    </a>
                </Link>
                {props.menuItems}
            </div>
            <div className="flex justify-between">
                <Search />
                <button
                    onClick={() => router.push("/subscribe")}
                    className="ml-3 bg-brand-blue text-white text-xs font-bold font-sans rounded-md py-[1px] px-3"
                >
                    SUBSCRIBE
                </button>
                {!user &&
                    <button
                        className="ml-3 text-sm text-gray-300 font-medium"
                        onClick={() => router.push("/login")}
                    >
                        LOGIN
                    </button>}
                {user &&
                    <div
                        className="relative"
                    >
                        <button onClick={toggleUserMenu}>
                            <AccountCircleOutlinedIcon
                                className="ml-3 font-light text-gray-400 text-3xl"
                            />
                        </button>
                        {isUserMenuVisible &&
                            <motion.ul
                                className="absolute mt-3 right-0 bg-[#192136] overflow-hidden text-sm w-28 text-left rounded-md"
                                animate={{ y: [10, 0], opacity: [0, 1] }}
                                transition={{ duration: .1 }}
                            >
                                <li className="py-2 px-3 hover:bg-[#030b17] cursor-pointer">
                                    Watch List
                                </li>
                                <li className="py-2 px-3 hover:bg-[#030b17] cursor-pointer">
                                    My Account
                                </li>
                                <li
                                    className="py-2 px-3 hover:bg-[#030b17] cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </li>
                            </motion.ul>
                        }
                    </div>
                }
            </div>
        </nav>
    )
}