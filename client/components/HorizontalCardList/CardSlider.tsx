import { motion } from "framer-motion"
import { useState } from "react"
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

interface Props {
    children: JSX.Element[],
    slideFactor: number,
    gap: number,
    cardWidth: number
}

export default function CardSlider({ children, slideFactor, gap, cardWidth }: Props) {
    const slideLength = (slideFactor + gap/2) * cardWidth; //128px = 8rem
    const [sliderCoordinate, setSliderCoordinate] = useState({ from: 0, to: 0 });
    const [canSlideRight, setCanSlideRight] = useState(false);
    const [canSlideLeft, setCanSlideLeft] = useState(true);

    function slideRight() {
        setSliderCoordinate((currentCoordinates) => {
            var from = currentCoordinates.to;
            var to = currentCoordinates.to + slideLength;
            if (currentCoordinates.to + slideLength >= 0) {
                to = 0;
                from = currentCoordinates.to
                setCanSlideRight(false);
            }

            if (!(currentCoordinates.to - slideLength >= - ((children.length - 4) * (cardWidth + gap)))) {
                setCanSlideLeft(true);
            }

            console.log(from, to);
            return {
                from,
                to
            }
        })
        console.log(sliderCoordinate)
    }
    function slideLeft() {
        setSliderCoordinate((currentCoordinates) => {
            var from = currentCoordinates.to;
            var to = currentCoordinates.to - slideLength;
            console.log(currentCoordinates.to - slideLength <= - (7 * 128))
            if (currentCoordinates.to - slideLength <= - ((children.length - 4) * 128)) {
                setCanSlideLeft(false);
                to = currentCoordinates.to - cardWidth 
                from = currentCoordinates.to
            }
            console.log("Current.to : " + to)
            if (to < 0) {
                setCanSlideRight(true);
            }
            console.log(from, to);
            return {
                from,
                to
            }
        })
    }

    return (
        <div className="relative">
            <div className="relative h-44 overflow-hidden">
                <motion.div
                    className="grid grid-flow-col absolute left-0 pl-8"
                    style={{gap:gap}}
                    animate={{ left: [sliderCoordinate.from, sliderCoordinate.to] }}
                >
                    {children}
                </motion.div>
            </div >
            {canSlideLeft && <button
                onClick={() => slideLeft()}
                className="h-44 absolute top-0 right-0 pr-2 pl-4"
                style={{ background: "linear-gradient(-90deg, rgba(12,17,27,1) 18%, rgba(0,212,255,0) 100%)" }}
            >
                <ChevronRightRoundedIcon className="h-10 w-10" />
            </button>}
            {canSlideRight && <button
                onClick={() => slideRight()}
                className="h-44 absolute top-0 left-0 pl-2 pr-4"
                style={{ background: "linear-gradient(90deg, rgba(12,17,27,1) 18%, rgba(0,212,255,0) 100%)" }}
            >
                <ChevronLeftRoundedIcon className="h-10 w-10" />
            </button>}
        </div>
    )
}