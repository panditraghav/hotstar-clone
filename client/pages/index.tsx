import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import MenuItems from "../components/MenuItems";
import HeroCarousel from '../components/HeroCarousel'
import VerticalCard from '../components/Card'
import HorizontalCardList from "../components/HorizontalCardList"
import { useUser } from '../context/UserContext'
import { useEffect } from 'react'
import { authFetcher } from '../utils/fetcher'

const Home: NextPage = () => {
  const { user, setUser } = useUser()

  useEffect(() => {
    async function getUser() {
      try {
        const res = await authFetcher({
          method: "get",
          url: `${process.env.API_ROUTE}/auth`
        })
        setUser(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  return (
    <div>
      <Layout>
        <HeroCarousel />
        <HorizontalCardList categoryTitle='Drama' />
        <HorizontalCardList categoryTitle='Action' />
      </Layout>
    </div>
  )
}

export default Home;
