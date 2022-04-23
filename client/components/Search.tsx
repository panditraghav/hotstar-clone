import { motion } from "framer-motion"
import SearchIcon from '@mui/icons-material/Search';
import { useRef, useEffect, useState } from "react";

export default function Search() {
    const [searchText, setSearchText] = useState("");

    return (
        <div className="relative">
            <motion.input
                placeholder="Search"
                className="bg-[#131A28] border-b-[1px] focus:outline-none float-right w-60 border-gray-400"
                whileFocus={{ width: "170%", borderColor: "#1f80e0" }}
                value={searchText}
                onInput={e => setSearchText(e.target.value)}
                onBlur={()=> setSearchText("")}
            />
            <SearchIcon className="absolute right-[1px] text-base top-[4px] text-gray-400" />
        </div>
    )
}