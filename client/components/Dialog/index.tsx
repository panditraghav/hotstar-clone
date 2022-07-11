import { useEffect } from "react";

interface Props {
    open: boolean;
    children: React.ReactNode
}

export default function Dialog({ open, children }: Props) {
    return (
        <div
            style={{ display: open ? "block" : "none" }}
            className="absolute top-0 left-0 w-screen h-screen backdrop-brightness-50 "
        >
            <div className="flex justify-center items-center w-full h-full">
                <div className="w-1/2 bg-brand-bg-1 rounded-md  ">
                    <div className="py-3 px-3">
                        Genre
                    </div>
                    <div className="overflow-y-scroll max-h-96">
                        {children}
                    </div>
                    <div className="py-3 px-3">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}