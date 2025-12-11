import React, { useContext, useState } from 'react'
import {assets} from "../assets/frontend_assets/assets"
import {Link, NavLink} from 'react-router-dom'
import { shopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const {setToken,setShowSearch,getCardCount,setcartItems,navigate,token} = useContext(shopContext)
    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setcartItems({})
        navigate("/login")

    }
   
    
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to={"/"}>
<h1 onClick={()=>navigate("/")} className="text-3xl text-red-300">ShopEase</h1>
</Link>
<ul className="hidden sm:flex gap-5 text-sm text-gray-700">
    <NavLink to={"/"} className='flex flex-col items-center gap-1  ' >
        <p>HOME</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        
        </NavLink> 
    <NavLink to={"/collection"} className='flex flex-col items-center gap-1 ' >
        <p>COLLECTION</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        
        </NavLink> 
    <NavLink to={"/about"} className='flex flex-col items-center gap-1 ' >
        <p>ABOUT</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        
        </NavLink> 
    <NavLink to={"/contact"} className='flex flex-col items-center gap-1 ' >
        <p>CONTACT</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        
        </NavLink> 
    <NavLink to={"https://e-commerce-admin-phi-five.vercel.app"} target='_blank' className='flex flex-col items-center gap-1 ' >
        <p>Admin</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        
        </NavLink> 
</ul>
<div className="flex items-center gap-6">
    <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
    <div className="group relative">
        <img onClick={()=>token ? null : navigate("/login")} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
         {/* ----Drop Down Menu  */}
       {
        token && <div className="group-hover:block hidden absolute dropDown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=>navigate('/Orders')} className='cursor-pointer hover:text-black'>Order</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
        </div>
       }
    </div>
    <Link to={"/cart"} className='relative'>
    <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white  rounded-full text-[8px]">{getCardCount()}</p>
    </Link>
    <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
</div>
{/* side bar menu for smaller screen */}
<div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
    <div className="flex flex-col text-gray-600">
        <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3">
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>back</p>
        </div>
        <NavLink  onClick={()=>setVisible(false)}  to={"/"} className="py-2 pl-6 border">HOME</NavLink>
        <NavLink  onClick={()=>setVisible(false)} to={"/collection"} className="py-2 pl-6 border">COLLECTION</NavLink>
        <NavLink onClick={()=>setVisible(false)}  to={"/about"} className="py-2 pl-6 border">ABOUT</NavLink>
        <NavLink onClick={()=>setVisible(false)}  to={"/contact"} className="py-2 pl-6 border">CONTACT</NavLink>
        <NavLink onClick={()=>setVisible(false)}  to={"https://e-commerce-admin-phi-five.vercel.app"} target='_blank' className="py-2 pl-6 border">Admin</NavLink>
    </div>
</div>
    </div>
  )
}

export default Navbar