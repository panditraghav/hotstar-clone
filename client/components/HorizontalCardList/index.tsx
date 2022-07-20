import { IShow } from "../../utils/interfaces";
import Card from "../Card"
import CardSlider from "./CardSlider"

interface Props {
    categoryTitle: string;
    shows: IShow[]
}

export default function HorizontalCardList({ categoryTitle, shows }: Props) {
    return (
        <div className="w-full text-white ">
            <h3 className="font-medium text-xl pl-6">{categoryTitle}</h3>
            <CardSlider cardWidth={138} cardHeight={186} slideFactor={3} gap={8}>
                {shows.map(show => {
                    return (
                        <Card
                            key={show._id}
                            width={138}
                            height={186}
                            description={show.description}
                            title={show.name}
                            link={show.type === "movie" ? `/movies/${show._id}` : `/series/${show._id}`}
                            image={`${process.env.API_ROUTE}/image/${show.cardImage.fileName}.${show.cardImage.extension}`}
                        />
                    )
                })}
            </CardSlider>
        </div>
    )
}