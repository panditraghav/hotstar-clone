import { motion } from "framer-motion"
import { useState } from "react"
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

interface Props {
    children: JSX.Element[]
}

export default function CardSlider({ children }: Props) {
    const slideLength = 4 * 128; //128px = 8rem
    const [sliderCoordinate, setSliderCoordinate] = useState({ from: 0, to: 0 });
    const [canSlideRight, setCanSlideRight] = useState(false);

    function slideRight() {
        setSliderCoordinate({
            from: sliderCoordinate.to,
            to: sliderCoordinate.to + slideLength
        })
        console.log(sliderCoordinate)
    }
    function slideLeft() {
        setSliderCoordinate((currentCoordinate) => {
            return {
                from: currentCoordinate.to,
                to: currentCoordinate.to - slideLength
            }
        })
        console.log(sliderCoordinate)
    }

    return (
        <div className="relative">
            <div className="relative h-44 overflow-hidden">
                <motion.div
                    className="grid gap-4 grid-flow-col absolute left-0"
                    animate={{ left: [sliderCoordinate.from, sliderCoordinate.to] }}
                >
                    {children}
                </motion.div>
            </div >
            {<button
                onClick={() => slideLeft()}
                className="h-44 absolute top-0 right-0 pr-2 pl-4"
                style={{background:"linear-gradient(-90deg, rgba(12,17,27,1) 18%, rgba(0,212,255,0) 100%)"}}
            >
                <ChevronRightRoundedIcon className="h-10 w-10"/>
            </button>}
            {canSlideRight && <button
                onClick={() => slideRight()}
                className="h-44 absolute top-0 left-0 pl-2 pr-4"
                style={{background: "linear-gradient(90deg, rgba(12,17,27,1) 18%, rgba(0,212,255,0) 100%)"}}
            >
                <ChevronLeftRoundedIcon className="h-10 w-10"/>
            </button>}
        </div>
    )
}