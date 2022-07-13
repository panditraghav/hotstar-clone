import { IShow } from "../../utils/interfaces";
import Card from "../Card"
import CardSlider from "./CardSlider"

interface Props {
    categoryTitle: string;
    shows: IShow[]
}

export default function HorizontalCardList({ categoryTitle, shows }: Props) {
    console.log(shows)
    return (
        <div className="w-full my-8 text-white ">
            <h3 className="font-medium text-xl mb-4 pl-6">{categoryTitle}</h3>
            <CardSlider cardWidth={138} slideFactor={3} gap={8}>
                {shows.map(show => {
                    return <Card width={138} height={186} image={`${process.env.API_ROUTE}/image/${show.banner.fileName}.${show.banner.extension}`} title={show.name} description={show.description} />
                })}
            </CardSlider>
        </div>
    )
}