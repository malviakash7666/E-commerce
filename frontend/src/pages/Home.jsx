import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../context/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <>
    <Hero />
    <LatestCollection/>
    <BestSeller />
    <OurPolicy />
    <NewsLetterBox />
    </>
  )
}

export default Home