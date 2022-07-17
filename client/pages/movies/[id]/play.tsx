import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Layout from "../../../components/Layout"
import { authFetcher } from "../../../utils/fetcher"
import { IMovie } from "../../../utils/interfaces"

export default function Play() {
    const router = useRouter()
    const { id } = router.query
    const { data: movie, error } = useSWR(() => {
        return {
            method: "get",
            url: `${process.env.API_ROUTE}/show/${id}`
        }
    }, authFetcher)

    return (
        <Layout>
            <div>
                {movie?.data ?
                    <video
                        src={`${process.env.API_ROUTE}/video/${movie.data.video.fileName}.${movie.data.video.extension}`}
                        typeof="video/mp4"
                        controls
                        className="w-full h-[454px] bg-black"
                    />
                    : <span className="text-white text-xl">loading...</span>
                }
            </div>
        </Layout>
    )
}