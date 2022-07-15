import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import HeroSliderLayout from "../../../components/HeroCarousel/HeroSliderLayout"
import Layout from "../../../components/Layout"
import { authFetcher } from "../../../utils/fetcher"
import { IShow } from "../../../utils/interfaces"

export default function Movie() {
    const router = useRouter()
    const [movieData, setMovieData] = useState<IShow>({})
    const [loaded, setLoaded] = useState(false)
    const { id } = router.query
    console.log(id)

    useEffect(() => {
        async function getMovieData() {
            if (!id) return
            try {
                const res = await authFetcher({
                    url: `${process.env.API_ROUTE}/show/${id}`
                })
                if (res.data) {
                    setMovieData(res.data)
                    setLoaded(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getMovieData()
    }, [id])

    return (
        <Layout>
            {loaded ?
                <div className="px-8 relative w-full">
                    <HeroSliderLayout show={movieData} />
                </div>
                : <span className="text-white">Loading ....</span>
            }
            <h1>{id}</h1>
        </Layout>
    )
}

