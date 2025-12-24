import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const Search = () => {
    const {search,setSearch,showSearch,setShowSearch} = useContext(shopContext)
    const location = useLocation()
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
    if(location.pathname.includes('collection')){
setVisible(true)
    } else{
      setVisible(false);
    }

    },[location])
  return showSearch  && visible  ? (
    <>
    <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 my-5 rounded-full  sm:w-1/2 w-fit  ">
        <input type="text" className='flex-1 outline-none bg-inherit text-sm w-2.5' placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} name="" id="" />
        <img src={assets.search_icon} className='sm:w-4 w-2' alt="" />
        </div> 
        <img onClick={()=>setShowSearch(false)}  src={assets.cross_icon} className='inline sm:w-3 w-1 cursor-pointer' alt="" />
    </div>
    
    </>
  ) : null
}

export default Search