import Image from "next/image"
import Link from "next/link";
import { useState } from "react"
import { IShow } from "../../utils/interfaces";

interface Props {
    width: number,
    height: number
    show: IShow
}

export default function Card({ width, height, show }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={show.type === "movie" ? `/movies/${show._id}` : `/series/${show._id}`}>
            <div
                className="cursor-pointer rounded-md relative transition-all ease-in-out duration-300 bg-brand-dark-blue hover:z-10 hover:scale-125"
                style={{ width: width, height: height }}
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
                    <div className="px-2 absolute bottom-0 h-2/3 ">
                        <span className="text-white text-[10px] font-medium">{show.name}</span><br />
                        <p className="text-gray-400 text-[10px] font-medium leading-3">{String.prototype.padEnd(70, show.description)}...</p>
                    </div>
                </div>
                <Image
                    alt={show.name}
                    className="rounded-md absolute"
                    src={`${process.env.API_ROUTE}/image/${show.cardImage.fileName}.${show.cardImage.extension}`}
                    width={width}
                    height={height}
                />
            </div>
        </Link>
    )
}