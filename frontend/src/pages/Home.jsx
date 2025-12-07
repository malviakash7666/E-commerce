import React from 'react'
import Hero from '../components/Hero'

import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import LatestCollection from '../components/LatestCollection'

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