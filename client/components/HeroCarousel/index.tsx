import Slider from "../AutoCarousel";
import Image from "next/image";
import slides from "./data";
import HeroSliderLayout from "./HeroSliderLayout";


export default function HeroCarousel() {
    return (
        <Slider slideWidth={1200} padding={20} startingMargin={48} height={444}>
            {slides.map((slide, index) => {
                return <HeroSliderLayout  key={index} slide={slide} />
            })}
        </Slider>
    )
}