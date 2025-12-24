import React from 'react'


function Navbar({setToken}) {
  
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
   
<h1 className="text-3xl text-black">WebCart
</h1>

      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2  sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer '>Logout</button>
      
    </div>
  )
}

export default Navbar
