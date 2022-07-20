import Image from "next/image"
import Link from "next/link";
import { useState } from "react"
import { IShow } from "../../utils/interfaces";

interface Props {
    showInfo?: boolean;
    width: number,
    height: number;
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function Card({ width, height, title, description, image, link, showInfo }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={link}>
            <div
                className="cursor-pointer rounded-md relative transition-all ease-in-out duration-300 bg-brand-dark-blue hover:z-10 hover:scale-125"
                style={{ width: width, height: height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {showInfo &&
                    <div
                        className="bg-opacity-20 absolute h-8 rounded-b-md w-full z-10 transition-all bottom-0 ease-linear"
                        style={{
                            background: "linear-gradient(0deg, rgba(15,28,55,0.8468429608171394) 0%, rgba(34,48,76,0) 100%)",
                            display: hovered ? "none" : "block"
                        }}
                    >
                        <h3 className="text-sm font-bold text-white px-5">{title}</h3>
                    </div>
                }
                <div
                    className="absolute h-full rounded-b-md w-full transition-all bottom-0 ease-linear"
                    style={{
                        background: "linear-gradient(0deg, rgba(19,26,40,1) 28%, rgba(0,212,255,0) 100%)",
                        opacity: hovered ? "100%" : "0%",
                        zIndex: hovered ? 10 : 0
                    }}
                >
                    <div className="px-2 absolute bottom-0 mb-3">
                        <h3 className="text-white text-[10px] font-medium">{title}</h3>
                        <p className="text-gray-400 text-[10px] font-medium leading-3">{String.prototype.padEnd(70, description)}...</p>
                    </div>
                </div>
                <Image
                    alt={title}
                    className="rounded-md absolute"
                    src={image}
                    width={width}
                    height={height}
                />
            </div>
        </Link>
    )
}