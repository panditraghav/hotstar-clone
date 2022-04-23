import Navbar from "../../components/Navbar";
import MenuItems from "../../components/MenuItems";

export default function sports(){
    return (
        <>
            <Navbar menuItems={<MenuItems selectedMenu="Sports"/>}/>
        </>
    )
}