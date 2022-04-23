import MenuItem from "./MenuItem";

interface Props {
    selectedMenu?: string
}

export default function MenuItems(props: Props) {
    return (
        <div className="mt-2 ml-4">
            <MenuItem
                name="TV"
                link="tv"
                isSelected={props.selectedMenu === "TV"}
            />
            <MenuItem
                name="Movies"
                link="movies"
                isSelected={props.selectedMenu === "Movies"}
            />
            <MenuItem
                name="Sports"
                link="sports"
                isSelected={props.selectedMenu === "Sports"}
            />
            <MenuItem
                name="Disney+"
                link="disneyplus"
                isSelected={props.selectedMenu === "Disney+"}
            />
        </div>
    )
}