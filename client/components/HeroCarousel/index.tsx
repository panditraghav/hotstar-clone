import Slider from "../AutoCarousel";
import Image from "next/image";
import shows from "./data";
import HeroSliderLayout from "./HeroSliderLayout";


export default function HeroCarousel() {
    return (
        <Slider slideWidth={1200} padding={20} startingMargin={48} height={444}>
            {shows.map((show, index) => {
                //@ts-ignore
                return <HeroSliderLayout  key={index} show={show} />
            })}
        </Slider>
    )
}