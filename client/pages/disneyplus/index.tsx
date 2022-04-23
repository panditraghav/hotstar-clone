import Navbar from "../../components/Navbar";
import MenuItems from "../../components/MenuItems";

export default function Disneyplus(){
    return (
        <>
            <Navbar menuItems={<MenuItems selectedMenu="Disney+"/>}/>
        </>
    )
}