import React, { useContext } from 'react'

import {shopContext} from "../context/ShopContext"
import { Link } from 'react-router-dom'

const Footer = () => {
    const {navigate} = useContext(shopContext)
  return (
    < >
        <div className='flex  flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-40 text-sm '>
        <div>
            <Link to={"/"}>
<h1 onClick={()=>navigate("/")} className="text-3xl ">ShopEase</h1>
</Link>
            <p className='w-full md:w-1/2 text-gray-600 '>Shopease brings you a smooth and reliable online shopping experience with quality products at honest prices. Our mission is to make shopping simple, fast, and secure for everyone.</p>
        </div>
<div >
    <p className="text-xl font-medium mb-5">COMPANY</p>
    <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer ">
        <Link to='/' className='hover:text-gray-400'>HOME</Link>
        <Link to='/about' className='hover:text-gray-400'>ABOUT US</Link>
        <Link to='/orders' className='hover:text-gray-400'>DELIVERY</Link>
        <Link to='/' className='hover:text-gray-400'>PRIVACY POLICY</Link>
    </ul>
</div>
<div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
    <ul className="flex flex-col gap-1 text-gray-600">
        <li>+91-8976987721</li>
        <li>contact@gmail.com</li>
    </ul>
</div>
        </div>
        <div className="text-base">
            <hr className='text-gray-200' />
            <p className='py-5  text-center'>Copyright 2025 @ ShopEase.com ,All rights are Reserved.</p>
        </div>
        </>
  )
}

export default Footer