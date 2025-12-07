import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    < >
        <div className='flex  flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-40 text-sm '>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-1/2 text-gray-600 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias vel ab, eum dolor facere perspiciatis illo, cupiditate iusto magnam nam asperiores aliquid, at dignissimos vitae rerum ipsam quisquam laborum perferendis?</p>
        </div>
<div >
    <p className="text-xl font-medium mb-5">COMPANY</p>
    <ul className="flex flex-col gap-1 text-gray-600">
        <li>HOME</li>
        <li>ABOUT US</li>
        <li>DELIVERY</li>
        <li>PRIVACY POLICY</li>
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
        <div>
            <hr className='text-gray-200' />
            <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com ,All rights are Reserved.</p>
        </div>
        </>
  )
}

export default Footer