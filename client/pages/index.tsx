import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import MenuItems from "../components/MenuItems";
import HeroCarousel from '../components/HeroCarousel'
import VerticalCard from '../components/Card'
import HorizontalCardList from "../components/HorizontalCardList"

const Home: NextPage = () => {
  return (
    <div>
      <Navbar menuItems={<MenuItems />} />
      <HeroCarousel />
      <HorizontalCardList categoryTitle='Drama'/>
      <HorizontalCardList categoryTitle='Action'/>
    </div>
  )
}

export default Home;
