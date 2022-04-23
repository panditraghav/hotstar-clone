import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Slider() {
    let divs = [
        {
            content: "Div1"
        },
        {
            content: "Div2"
        },
        {
            content: "Div3"
        },
    ]
    const [divState, setDivState] = useState(divs);

    useEffect(() => {
        setInterval(() => {
            console.log(divState);
            let newDivState = divState;
            var last = newDivState.pop();
            newDivState.unshift(last);
            setDivState(newDivState)
        }, 2000)
    })

    useEffect(() => {
        console.log(divState);
    }, [divState])

    return (
        <div className="h-[400px] bg-brand-dark-blue relative overflow-hidden">
            {divState.map((div, index) => {
                return index === Math.floor(divState.length / 2) &&
                    <motion.div
                        className="h-[380px] w-11/12 mx-auto bg-orange-100 rounded-md absolute text-black"
                        animate={{ translateX: 50 }}
                        key={div.content}
                    >
                       {div.content} 
                    </motion.div>
            })}
        </div>
    )
}