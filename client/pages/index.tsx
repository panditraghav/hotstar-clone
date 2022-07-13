import type { NextPage } from 'next'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import HeroCarousel from '../components/HeroCarousel'
import HorizontalCardList from "../components/HorizontalCardList"
import { useEffect, useState } from 'react'
import axios from 'axios'

interface IGenre {
  _id: string;
  name: string
}


const Home: NextPage = () => {
  const [genres, setGenres] = useState<IGenre[]>([])
  const [availableGenres, setAvailableGenres] = useState<string[]>([])
  const [shows, setShows] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function getHomePageData() {
      try {
        const res = await axios.get(`${process.env.API_ROUTE}/genre/`)
        setGenres(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    getHomePageData()
  }, [])

  useEffect(() => {
    async function getShows() {
      genres.forEach(async (genre) => {
        const res = await axios.get(`${process.env.API_ROUTE}/show/all/genre=${genre.name}`)
        if (res.data.length > 0) {
          let newShows = Object(shows)
          newShows[genre.name] = res.data
          setShows(newShows)
          setAvailableGenres(Object.keys(newShows))
        }
      })
      console.log(shows)
      setLoaded(true)
    }
    getShows()
  }, [genres])

  return (
    <div>
      <Layout>
        <HeroCarousel />
        {loaded ? availableGenres.map((genres) => {
          return <HorizontalCardList key={genres} categoryTitle={genres} shows={shows[genres]} />
        })
          : <span className='text-white'>Loading....</span>}
      </Layout>
    </div>
  )
}

export default Home;
