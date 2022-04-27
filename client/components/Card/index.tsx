import Image from "next/image"
import { useState } from "react"

interface Props {
    image: string,
    title: string,
    description: string,
    width: number,
    height: number
}

export default function Card({ width, height, image, title, description }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="cursor-pointer rounded-md relative transition-all ease-in-out duration-300 bg-brand-dark-blue hover:z-10 hover:scale-125"
            style={{width: width, height: height}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className="absolute h-full rounded-b-md w-full z-10 transition-all bottom-0 ease-linear"
                style={{
                    background: "linear-gradient(0deg, rgba(19,26,40,1) 28%, rgba(0,212,255,0) 100%)",
                    opacity: hovered ? "100%" : "0%"
                }}
            >
                <div className="px-2 absolute bottom-0 h-1/2">
                    <span className="text-white text-[10px] font-medium">{title}</span><br/>
                    <p className="text-gray-400 text-[10px] font-medium leading-3">{description}</p>
                </div>
            </div>
            <Image className="rounded-md absolute" src={image} width={width} height={height} />
        </div>
    )
}