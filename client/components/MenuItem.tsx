import Link from "next/link"
import { useState } from "react"
import { FC } from "react"

interface Props {
    name: string,
    link: string,
    isSelected: boolean
}

export default function MenuItem(props: Props){
    const [isHovered, setIsHovered] = useState(false);

    function toggleHover(){
       setIsHovered(value => !value);
    }

    return (
        <span
            style={{color: props.isSelected || isHovered? "white" : "#D0D1D4"}}
            className="font-sans mr-7 font-medium"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            <Link href={`/${props.link}`}>{props.name}</Link>
        </span>
    )
}