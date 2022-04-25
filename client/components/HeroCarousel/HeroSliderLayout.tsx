import Image from "next/image";

interface Props {
    slide: {
        image: string,
        title: string,
        description: string,
        tags: string[]
    },
}

export default function HeroSliderLayout({ slide }: Props) {
    return (
        <div>
            <div
                style={{ background: "linear-gradient(90deg, rgba(3,11,23,1) 0%, rgba(3,11,23,1) 32%, rgba(0,212,255,0) 47%, rgba(0,212,255,0) 100%, rgba(0,212,255,0) 100%)" }}
                className="w-full h-full absolute rounded-l-md"
            ></div>
            <div className="absolute right-0 -z-10">
                <Image
                    src={slide.image}
                    width={790}
                    height={444}
                    className="rounded-r-md"
                />
            </div>
            <div className="absolute ml-20 left-0 w-1/2">
                <h2 className="text-white text-3xl font-bold mt-24 text-left">{slide.title}</h2>
                <div className="flex justify-start my-3">
                    {slide.tags.map((value, index) => {
                        return (
                            index !== (slide.tags.length - 1) ?
                                <div className="flex items-center flex-row" key={index}>
                                    <span className="text-gray-400">{value}</span>
                                    <span className="mx-1 w-1 h-1 rounded-full bg-gray-400 inline-block"></span>
                                </div> :
                                <div className="flex items-center flex-row" key={index}>
                                    <span className="text-gray-400">{value}</span>
                                </div>
                        )
                    })}
                </div>
                <div className="w-3/5 text-left text-gray-300">
                    <p>{slide.description}</p>
                </div>
            </div>
        </div>

    )
}