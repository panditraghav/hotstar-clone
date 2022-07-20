import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Card from "../../../../components/Card"
import HeroSliderLayout from "../../../../components/HeroCarousel/HeroSliderLayout"
import CardSlider from "../../../../components/HorizontalCardList/CardSlider"
import Layout from "../../../../components/Layout"
import { authFetcher } from "../../../../utils/fetcher"
import { IMovie, ISeason, IShow } from "../../../../utils/interfaces"

export default function Season() {
    const router = useRouter()
    const { id, sid } = router.query
    const { data: series, error } = useSWR<{ data: IShow }, {}>(() => {
        return {
            method: "get",
            url: `${process.env.API_ROUTE}/show/${id}`
        }
    }, authFetcher)
    const [season, setSeason] = useState<ISeason | null>(null)

    useEffect(() => {
        if (series?.data && sid) {
            series.data.seasons?.forEach(season => {
                if (season._id === sid) setSeason(season)
            })
        }
    }, [series, sid])

    return (
        <Layout>
            {season ?
                <div className="mx-8">
                    <h2
                        className="text-xl my-3 text-white"
                    >
                        Season {season.number}
                    </h2>
                    <div className="flex flex-row flex-wrap">
                        {season.episodes?.map(episode => {
                            return (
                                <div className="mx-2">
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
                                </div>
                            )
                        })
                        }

                    </div>
                </div>
                : <span className="text-white">Loading ....</span>
            }
        </Layout>
    )
}

