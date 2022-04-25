import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

interface Props {
    slideWidth: number,
    startingMargin: number,
    height: number,
    padding: number,
    children: JSX.Element[]
}

export default function Slider({
    slideWidth,
    padding,
    startingMargin,
    height,
    children
}: Props) {
    const startingAnimationCoordinates = children.map((value, index) => ({ from: slideWidth * (index - 1) + startingMargin, to: slideWidth * (index - 1) + startingMargin }));

    const [offset, setOffset] = useState(0);
    const [animationCoordinates, setAnimationCoordinates] = useState(startingAnimationCoordinates);

    useEffect(() => {
        var intervalId = setInterval(() => {
            slideLeft();
        }, 6000);
        return () => clearInterval(intervalId);
    }, [])

    function slideLeft() {
        setAnimationCoordinates(current => {
            return current.map((value, index) => {
                let from = (value.to === -2 * slideWidth + startingMargin) ? (current.length - 2) * slideWidth + startingMargin : value.to;
                let to = (value.to === -2 * slideWidth + startingMargin) ? (current.length - 3) * slideWidth + startingMargin : value.to - slideWidth;
                return {
                    from,
                    to
                }
            })
        })
    }

    function slideRight() {
        setAnimationCoordinates(current => {
            return current.map((value, index) => {
                let from = (value.to === (current.length - 2) * slideWidth + startingMargin) ? -2 * slideWidth + startingMargin : value.to;
                let to = (value.to === (current.length - 2) * slideWidth + startingMargin) ? -1 * slideWidth + startingMargin : value.to + slideWidth;
                return {
                    from,
                    to
                }
            })
        })
    }

    return (
        <div
            className={`bg-brand-bg relative overflow-hidden w-full z-0`}
            style={{ height: height }}
        >
            {children.map((slide, index) => {
                return <motion.div
                    className={`absolute h-full rounded-md text-left`}
                    style={{ width: slideWidth - padding, left: slideWidth * (index - 1) + startingMargin }}
                    animate={{ left: [animationCoordinates[index].from, animationCoordinates[index].to] }}
                    transition={{ duration: .5 }}
                    key={index}
                >
                    {slide}
                </motion.div>
            })}

            < ChevronLeftRoundedIcon
                className="absolute left-[-20px] top-[145px] text-8xl text-white cursor-pointer"
                onClick={slideRight}
            />
            <ChevronRightRoundedIcon
                className="absolute right-[-20px] top-[145px] text-8xl text-white cursor-pointer"
                onClick={slideLeft}
            />
        </div >
    )
}
