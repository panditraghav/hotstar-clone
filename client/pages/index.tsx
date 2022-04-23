import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import MenuItems from "../components/MenuItems";
import Slider from "../components/Slider";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar menuItems={<MenuItems />} />
      <Slider />
    </div>
  )
}

export default Home
