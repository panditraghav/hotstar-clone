import Image from "next/image";
import logo from "../public/logo-dark.svg";
import Search from "../components/Search";
import BtnPrimary from "../components/Button/BtnPrimary";
import { useRouter } from "next/router"

interface Props {
    menuItems: JSX.Element
}

export default function NavBar(props: Props) {
    const router = useRouter();
    return (
        <nav className="bg-brand-dark-blue h-[72px] flex items-center px-16 justify-between mb-4 sticky top-0 z-50 cursor-pointer" onClick={() => router.push("/")}>
            <div className="flex justify-center items-center">
                <div className="flex flex-col h-3 justify-between mt-2 mr-4">
                    <div className="w-4 h-[2px] bg-gray-400"></div>
                    <div className="w-4 h-[2px] bg-gray-400"></div>
                    <div className="w-4 h-[2px] bg-gray-400"></div>
                </div>
                <Image src={logo} width={115} height={42} />
                {props.menuItems}
            </div>
            <div className="flex justify-between">
                <Search />
                <button
                    onClick={() => router.push("/subscribe")}
                    className="ml-3 bg-brand-blue text-xs font-bold font-sans rounded-md py-[1px] px-3"
                >
                    SUBSCRIBE
                </button>
                <button className="ml-3 text-sm text-gray-300 font-medium">
                    LOGIN
                </button>
            </div>
        </nav>
    )
}