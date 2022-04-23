import Navbar from "../../components/Navbar";
import MenuItems from "../../components/MenuItems";

export default function Movies(){
    return (
        <>
            <Navbar menuItems={<MenuItems selectedMenu="Movies"/>}/>
        </>
    )
}