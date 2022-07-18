import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Card from "../../../components/Card"
import HeroSliderLayout from "../../../components/HeroCarousel/HeroSliderLayout"
import CardSlider from "../../../components/HorizontalCardList/CardSlider"
import Layout from "../../../components/Layout"
import { authFetcher } from "../../../utils/fetcher"
import { IMovie } from "../../../utils/interfaces"

export default function Movie() {
    const router = useRouter()
    const { id } = router.query
    const { data: series, error } = useSWR(() => {
        return {
            method: "get",
            url: `${process.env.API_ROUTE}/show/${id}`
        }
    }, authFetcher)

    return (
        <Layout>
            {series?.data ?
                <div className="px-8 relative w-full">
                    <HeroSliderLayout type={"series"} show={series.data} />
                </div>
                : <span className="text-white">Loading ....</span>
            }
            {series?.data ?
                <div>
                    <h2 className="text-xl my-3 text-white">Episodes</h2>
                    {<CardSlider cardWidth={187} cardHeight={105} gap={8} slideFactor={3}>
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                        <Card width={187} height={105} show={series?.data} />
                    </CardSlider>}
                </div>
                : <span className="text-white">Loading ....</span>
            }
        </Layout>
    )
}

