import NavBar from "./Navbar";
import MenuItems from "./MenuItems"

interface Props {
    children: React.ReactNode,
    pageName?: string
}

export default function Layout({ children, pageName }: Props) {
    return (
        <>
            <NavBar menuItems={<MenuItems selectedMenu={pageName} />} />
            {children}
        </>
    )
}