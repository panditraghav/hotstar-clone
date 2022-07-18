import { motion } from "framer-motion"
import { useState } from "react"
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

interface Props {
    children: JSX.Element[],
    slideFactor: number,
    gap: number,
    cardWidth: number;
    cardHeight: number
}

export default function CardSlider({ children, slideFactor, gap, cardWidth, cardHeight }: Props) {
    const slideLength = (slideFactor + gap / 2) * cardWidth; //128px = 8rem
    const [sliderCoordinate, setSliderCoordinate] = useState({ from: 0, to: 0 });
    const [canSlideRight, setCanSlideRight] = useState(false);
    const [canSlideLeft, setCanSlideLeft] = useState((children.length || 1) * (cardWidth + gap) > 1200);

    function slideRight() {
        setSliderCoordinate((currentCoordinates) => {
            var from = currentCoordinates.to;
            var to = currentCoordinates.to + slideLength;
            if (currentCoordinates.to + slideLength >= 0) {
                to = 0;
                from = currentCoordinates.to
                setCanSlideRight(false);
            }

            if (!(currentCoordinates.to - slideLength >= - (((children.length || 1) - 4) * (cardWidth + gap)))) {
                setCanSlideLeft(true);
            }

            return {
                from,
                to
            }
        })
    }
    function slideLeft() {
        setSliderCoordinate((currentCoordinates) => {
            var from = currentCoordinates.to;
            var to = currentCoordinates.to - slideLength;
            if (currentCoordinates.to - slideLength <= - (((children.length || 1) - 4) * (cardWidth + gap))) {
                setCanSlideLeft(false);
                to = currentCoordinates.to - cardWidth
                from = currentCoordinates.to
            }
            if (to < 0) {
                setCanSlideRight(true);
            }
            return {
                from,
                to
            }
        })
    }

    return (
        <div className="relative">
            <div style={{ height: cardHeight + 80 }} className="relative -top-8 pt-8 overflow-x-hidden overflow-y-hidden">
                <motion.div
                    className="grid grid-flow-col absolute left-0 pl-6"
                    style={{ gap: gap }}
                    animate={{ left: [sliderCoordinate.from, sliderCoordinate.to] }}
                >
                    {children}
                </motion.div>
            </div >
            {canSlideLeft && <button
                onClick={() => slideLeft()}
                className="absolute top-0 right-0 pr-2 pl-4 z-40 transition ease-linear"
                style={{ background: "linear-gradient(-90deg, rgba(12,17,27,1) 18%, rgba(0,22,255,0) 100%)", height: cardHeight }}
            >
                <ChevronRightRoundedIcon className="h-10 w-10 text-white" />
            </button>}
            {canSlideRight && <button
                onClick={() => slideRight()}
                className="absolute top-0 left-0 pl-2 pr-4 z-40 transition ease-linear"
                style={{ background: "linear-gradient(90deg, rgba(12,17,27,1) 18%, rgba(0,212,255,0) 100%)", height: cardHeight }}
            >
                <ChevronLeftRoundedIcon className="h-10 w-10 text-white" />
            </button>}
        </div>
    )
}