import SideNavItem from "../SideNavItem";

interface Props {
    selectedItem: "All Content" | "Movies" | "Series" | "Genres"
}

const sideNavItems = ["All Content", "Movies", "Series", "Genres"]

export default function Sidebar({ selectedItem }) {

    function isSelected(item): boolean {
        return selectedItem === item
    }

    return (
        <div className="border-r-2 text-gray-200 border-gray-600 h-screen fixed w-1/5">
            <h1 className="text-center my-5 text-2xl">Hotstar Admin</h1>
            {sideNavItems.map((item) => {
                if (item === "All Content")
                    return <SideNavItem endpoint={""} key={item} selected={isSelected(item)}>{item}</SideNavItem>
                return <SideNavItem endpoint={item.toLowerCase()} key={item} selected={isSelected(item)}>{item}</SideNavItem>
            })}
        </div>
    )
}