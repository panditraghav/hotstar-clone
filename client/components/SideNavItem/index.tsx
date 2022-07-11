import Link from "next/link"

interface Props {
    onClick?: () => void;
    children: React.ReactNode;
    selected: boolean;
    endpoint: string
}

export default function SideNavItem({ onClick, children, selected, endpoint }: Props) {
    return (
        <Link href={`/admin/${endpoint}`}>
            <a
                className="block text-center w-full hover:bg-slate-800 py-3 my-1"
                style={{ backgroundColor: selected ? "#1E293B" : "none" }}
                href=""
            >
                {children}
            </a>
        </Link>
    )
}