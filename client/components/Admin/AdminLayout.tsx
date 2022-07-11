import React, { Children } from "react"

interface AdminLayoutProps {
    sidebar: JSX.Element;
    children: React.ReactNode
}

export default function AdminLayout({sidebar, children}: AdminLayoutProps) {
    return (
        <div className="flex flex-row">
            <div className="basis-1/5">
                {sidebar}
            </div>
            <div className="basis-4/5">
                {children}
            </div>
        </div>
    )
}
