import { PlayArrow } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { IShow } from "../../utils/interfaces";

interface Props {
    show: IShow,
    type?: "movie" | "series"
}

export default function HeroSliderLayout({ show, type }: Props) {
    return (
        <div className="h-[444px] w-full relative">
            <div
                style={{ background: "linear-gradient(90deg, rgba(3,11,23,1) 0%, rgba(3,11,23,1) 34%, rgba(3,11,23,0) 42%)" }}
                className="w-full h-[444px] absolute rounded-l-md"
            ></div>
            <div className="absolute right-0 -z-10">
                <Image
                    alt={"Hero slide"}
                    src={`${process.env.API_ROUTE}/image/${show.bannerImage.fileName}.${show.bannerImage.extension}`}
                    width={790}
                    height={444}
                    className="rounded-r-md"
                />
            </div>
            <div className="absolute ml-20 left-0 w-1/2">
                <h2 className="text-white text-3xl font-bold mt-24 text-left">{show.name}</h2>
                <div className="flex justify-start my-3">
                    {show.genres.map((genre, index) => {
                        return (
                            index !== (show.genres.length - 1) ?
                                <div className="flex items-center flex-row" key={index}>
                                    <span className="text-gray-400">{genre.name}</span>
                                    <span className="mx-1 w-1 h-1 rounded-full bg-gray-400 inline-block"></span>
                                </div> :
                                <div className="flex items-center flex-row" key={index}>
                                    <span className="text-gray-400">{genre.name}</span>
                                </div>
                        )
                    })}
                </div>
                <div className="w-3/5 text-left text-gray-300">
                    <p>{show.description}</p>
                </div>
                {type && <div className="text-white">
                    <Link href={type == "movie" ? `/movies/${show._id}/play` : `/series/${show._id}/play`}>
                        <div className="cursor-pointer text-2xl mt-12">
                            <PlayArrow fontSize="large" />
                            <span>
                                Watch
                            </span>
                        </div>
                    </Link>
                </div>}
            </div>
        </div >

    )
}