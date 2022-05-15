import NavBar from "./Navbar";
import MenuItems from "./MenuItems"

interface Props {
    children: Array<JSX.Element>,
    pageName?: string
}

export default function Layout({ children, pageName }: Props) {
    return (
        <div>
            <NavBar menuItems={<MenuItems selectedMenu={pageName} />} />
            {children}
        </div>
    )
}