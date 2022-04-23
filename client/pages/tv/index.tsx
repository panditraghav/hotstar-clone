import Navbar from "../../components/Navbar";
import MenuItems from "../../components/MenuItems";

export default function TV(){
    return (
        <>
            <Navbar menuItems={<MenuItems selectedMenu="TV"/>}/>
        </>
    )
}