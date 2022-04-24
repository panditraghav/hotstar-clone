import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

let divs = [
    {
        content: "Div1",
    },
    {
        content: "Div2"
    },
    {
        content: "Div3"
    },
    {
        content: "Div4"
    },
    {
        content: "Div5"
    },
    {
        content: "Div6"
    },
];
const margin = 65;
const padding = 10;
const slideWidth = 1150;
const startingAnimationCoordinates = divs.map((value, index) => ({ from: slideWidth * (index - 1) + margin, to: slideWidth * (index - 1) + margin }));

export default function Slider() {
    const [divState, setDivState] = useState(divs);
    const [offset, setOffset] = useState(0);
    const [animationCoordinates, setAnimationCoordinates] = useState(startingAnimationCoordinates);

    function slideLeft() {
        setAnimationCoordinates(current => {
            return current.map((value, index) => {
                let from = (value.to === -2 * slideWidth + margin) ? (current.length - 2) * slideWidth + margin : value.to;
                let to = (value.to === -2 * slideWidth + margin) ? (current.length - 3) * slideWidth + margin : value.to - slideWidth;
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
                let from = (value.to === 2 * slideWidth + margin) ? -(current.length - 2) * slideWidth + margin : value.to;
                let to = (value.to === 2 * slideWidth + margin) ? -(current.length - 3) * slideWidth + margin : value.to + slideWidth;
                return {
                    from,
                    to 
                }
            })
        })
    }

    // useEffect(() => {
    //     setInterval(()=>{
    //         slideLeft();
    //     },6000)
    // },[])

    return (
        <motion.div className={`h-[400px] bg-brand-dark-blue relative overflow-hidden`}>
            {divState.map((div, index) => {
                return <motion.div
                    className={`bg-orange-300 absolute h-[400px] rounded-md text-black text-8xl text-center`}
                    style={{ width: slideWidth - padding, left: slideWidth * (index - 1) + margin }}
                    animate={{ left: [animationCoordinates[index].from, animationCoordinates[index].to] }}
                    transition={{ duration: .5 }}
                >
                    {div.content}
                </motion.div>
            })}
            <ChevronLeftRoundedIcon
                className="absolute left-[-20px] top-[145px] text-8xl text-white cursor-pointer"
                onClick={slideRight}
            />
            <ChevronRightRoundedIcon
                className="absolute right-[-20px] top-[145px] text-8xl text-white cursor-pointer"
                onClick={slideLeft}
            />
        </motion.div >
    )
}