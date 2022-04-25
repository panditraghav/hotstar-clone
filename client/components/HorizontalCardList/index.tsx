import VerticalCard from "../VerticalCard"
import CardSlider from "./CardSlider"

interface Props {
    categoryTitle: string
}

export default function HorizontalCardList({ categoryTitle }: Props) {
    return (
        <div className="w-full my-8 text-white">
            <h3 className="font-medium text-xl mb-4 px-16">{categoryTitle}</h3>
            <CardSlider cardWidth={128} slideFactor={3} gap={8}>
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
                <VerticalCard />
            </CardSlider>
        </div>
    )
}