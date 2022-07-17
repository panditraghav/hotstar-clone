import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import HeroSliderLayout from "../../../components/HeroCarousel/HeroSliderLayout"
import Layout from "../../../components/Layout"
import { authFetcher } from "../../../utils/fetcher"
import { IMovie } from "../../../utils/interfaces"

export default function Movie() {
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
            {movie?.data ?
                <div className="px-8 relative w-full">
                    <HeroSliderLayout show={movie.data} />
                </div>
                : <span className="text-white">Loading ....</span>
            }
        </Layout>
    )
}

