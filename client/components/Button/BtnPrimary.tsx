import { useRouter } from "next/router"

interface Props {
    children: React.ReactNode
    onClick?: () => void
}

export default function BtnPrimary({ children, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="ml-3 bg-brand-blue hover:bg-[#1968b5] transition-all hover:text-gray-100 text-sm font-bold font-sans rounded-md py-2 px-5"
        >
            {children}
        </button>
    )

}