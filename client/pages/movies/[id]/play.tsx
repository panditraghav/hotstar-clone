import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../../components/Layout"
import { authFetcher } from "../../../utils/fetcher"
import { IShow } from "../../../utils/interfaces"

export default function Play() {
    const [show, setShow] = useState<IShow>()
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        async function getShow() {
            console.log(id)
            if (id)
                try {
                    const res = await authFetcher({
                        method: "get",
                        url: `${process.env.API_ROUTE}/show/${id}`
                    })
                    setShow(res.data)
                    console.log(show)
                    setLoaded(true)
                    console.log(res.data)
                } catch (error) {
                    console.log(error)
                }
        }
        getShow()
    }, [id])

    return (
        <Layout>
            <div>
                {loaded ?
                    <video
                        src={`${process.env.API_ROUTE}/video/${show.video.fileName}.${show.video.extension}`}
                        typeof="video/mp4"
                        controls
                        title={show.name}
                        className="w-full h-[454px] bg-black"
                    />
                    : <span className="text-white text-xl">loading...</span>
                }
            </div>
        </Layout>
    )
}