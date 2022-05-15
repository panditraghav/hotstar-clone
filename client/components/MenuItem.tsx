import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FC } from "react"

interface Props {
    name: string,
    link: string,
    isSelected: boolean
}

export default function MenuItem(props: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter()

    function toggleHover() {
        setIsHovered(value => !value);
    }

    return (
        <span
            style={{ color: props.isSelected || isHovered ? "white" : "#D0D1D4" }}
            className="font-sans mr-7 font-medium"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            // onClick={router.push(`/${props.link}`)}
        >
            <Link href={`/${props.link}`}><a>{props.name}</a></Link>
            {/* {props.name} */}
        </span>
    )
}