import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Card from "../../../components/Card"
import HeroSliderLayout from "../../../components/HeroCarousel/HeroSliderLayout"
import CardSlider from "../../../components/HorizontalCardList/CardSlider"
import Layout from "../../../components/Layout"
import { authFetcher } from "../../../utils/fetcher"
import { IMovie, IShow } from "../../../utils/interfaces"

export default function Series() {
    const router = useRouter()
    const { id } = router.query
    const { data: series, error } = useSWR<{ data: IShow }, {}>(() => {
        return {
            method: "get",
            url: `${process.env.API_ROUTE}/show/${id}`
        }
    }, authFetcher)

    console.log(series)
    return (
        <Layout>
            {series?.data ?
                <div className="px-8 relative w-full">
                    <HeroSliderLayout type={"series"} show={series.data} />
                </div>
                : <span className="text-white">Loading ....</span>
            }
            {series?.data ?
                <div className="mx-8">
                    <h2
                        className="text-xl my-3 text-white cursor-pointer"
                    >
                        <Link href={`/series/${id}/episodes`}>
                            <a className="hover:text-brand-blue">Episodes</a>
                        </Link>
                    </h2>
                    {<CardSlider cardWidth={187} cardHeight={105} gap={8} slideFactor={3}>
                        {series.data.seasons.map(season => {
                            return season.episodes.map(episode => {
                                return (
                                    <Card
                                        key={episode._id}
                                        height={105}
                                        width={187}
                                        title={`S${season.number} E${episode.number}`}
                                        link={`/series/${series.data._id}/play/${episode._id}`}
                                        description={series.data.description}
                                        image={`${process.env.API_ROUTE}/image/${series.data.bannerImage.fileName}.${series.data.bannerImage.extension}`}
                                        showInfo
                                    />
                                )
                            })
                        })}
                    </CardSlider>}
                </div>
                : <span className="text-white">Loading ....</span>
            }
            {series?.data ?
                <div className="mx-8">
                    <Link href={`/series/${id}/episodes`}>
                        <h2 className="text-xl my-3 text-white">Seasons</h2>
                    </Link>
                    {<CardSlider cardWidth={187} cardHeight={105} gap={8} slideFactor={3}>
                        {series.data.seasons?.map(season => {
                            return (
                                <Card
                                    key={season._id}
                                    height={105}
                                    width={187}
                                    title={`Season ${season.number}`}
                                    link={`/series/${series.data._id}/season/${season._id}`}
                                    description={""}
                                    image={`${process.env.API_ROUTE}/image/${series.data.bannerImage.fileName}.${series.data.bannerImage.extension}`}
                                    showInfo
                                />
                            )
                        })}
                    </CardSlider>}
                </div>
                : <span className="text-white">Loading ....</span>
            }
        </Layout>
    )
}

