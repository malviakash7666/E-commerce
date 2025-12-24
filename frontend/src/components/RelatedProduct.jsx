import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import Title from '../components/Title'

import ProductItem from '../components/ProductItem'
// import { product } from '../assets/frontend_assets/assets'


const RelatedProduct = ({category,subCategory}) => {
    const {products} = useContext(shopContext)
    const [related,setRelated] = useState([])
    useEffect(() => {
    
        // let productCopy =products.length>0? products.slice() : product.slice() ;
       let productCopy =products.slice();

        productCopy = productCopy.filter((item)=>category === item.category);
        productCopy = productCopy.filter((item)=>subCategory === item.subCategory)
        setRelated(productCopy.slice(0,5))

      
    
     
    }, [products])
    
  return (
    <div className='my-24'>
        <div className="text-3xl text-center py-2">
            <Title text1={"RELATED"} text2={'PRODUCTS'} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
            {related.map((item,index)=>(
                <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} key={index} />
            ))}
        </div>
    </div>
  )
}

export default RelatedProduct