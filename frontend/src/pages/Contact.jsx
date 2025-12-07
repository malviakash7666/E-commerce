import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
<div className="text-center text-2xl pt-10 border-t">
  <Title text1={"CONTACT"} text2={'US'} />
</div>
<div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
  <img className="w-full md:max-w-[480px]" src={assets.contact_img}  />
  <div className="flex flex-col justify-center items-start gap-6 ">
    <p className="font-semibold text-xl text-gray-600">Our Store</p>
    <p className='text-gray-500'>54709 Williams Station <br /> Suited 350,Washingtan, USA </p>
    <p className='text-gray-500'>Tel: (91)  1800-30000-123 <br /> email:example@gmail.com </p>
    <p className='font-semibold text-xl text-gray-600 '>Careers at Forever</p>
    <p className='text-gray-600'>Learn more about our teams and job opning </p>
    <button className="border border-black py-4 px-8 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
  </div>


</div>
<NewsLetterBox />


    </div>
  )
}

export default Contact