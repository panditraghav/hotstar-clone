import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import SeriesDialog from "../../../../components/SeriesDialog"
import Layout from "../../../../components/Layout"
import { authFetcher } from "../../../../utils/fetcher"
import { IEpisode, IShow } from "../../../../utils/interfaces"

export default function Play() {
    const router = useRouter()
    const { id, epid } = router.query
    const [episode, setEpisode] = useState<IEpisode | null>(null)
    console.log(id, epid)
    const { data: series, error } = useSWR<{ data: IShow }>(() => {
        return {
            method: "get",
            url: `${process.env.API_ROUTE}/show/${id}`
        }
    }, authFetcher)

    useEffect(() => {
        if (series && series.data && epid) {
            series.data.seasons?.forEach(season => {
                season.episodes?.forEach(episode => {
                    if (episode._id === epid) {
                        setEpisode(episode)
                    }
                })
            })
        }

    }, [series, id, epid])


    return (
        <Layout>
            <div>
                {episode ?
                    <video
                        src={`${process.env.API_ROUTE}/video/${episode.video.fileName}.${episode.video.extension}`}
                        typeof="video/mp4"
                        controls
                        className="w-full h-[454px] bg-black"
                    />
                    : <span className="text-white text-xl">loading...</span>
                }
                <h1 className="text-white">{id}, {epid}</h1>
            </div>
        </Layout>
    )
}