import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import { FaUser } from "react-icons/fa";
const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCard } = useContext(shopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size,setSize] = useState('');
  const fetchProduct = () => {
   products.length > 0 && products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data  */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
        {/* product image  */}
        <div className="flex-1 flex flex-col-reverse gap2 sm:flex-row  ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full mr-2">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-2xl font-semibold">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 ">
              {
                productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${size === item ? "border-orange-500" : ""} cursor-pointer`} key={index}>{item}</button>

                ))
              }
            </div>
          </div>
          <button onClick={()=>addToCard(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CARD</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% orignal product.</p>
            <p>Cash on delivery are available on this product.</p>
            <p>Easy return and exchange police within a 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and Review Section  */}
      <div className="flex sm:flex-row flex-col gap-3 justify-around mt-5 ">
     <div>
      <h1 className="sm:text-2xl text-balance">About This Product</h1>
      <p>{productData.description.split(",").map((item,index)=>(
        <span key={index}>💠{item.trim()}
        <br />
        </span>
      ))}</p>
     </div>
     <div></div>
     <div className="lex ">
      <h1 className="sm:text-2xl text-balance">Top reviews from India</h1>
      <div>
        <div className="flex gap-2">
<FaUser />
<h1>Rohan</h1></div>
<div className="flex sm:flex-row flex-col gap-4">
  <div className="flex gap-1">
   <img src={assets.star_icon} alt="" className="sm:w-3.5 w-0.5" />
   <img src={assets.star_icon} alt="" className="w-3.5" />
   <img src={assets.star_icon} alt="" className="w-3.5" />
   <img src={assets.star_icon} alt="" className="w-3.5" />
   </div>
   <p className="font-bold"> Design and quality of material</p>
</div>
<div>
  <p>Size:Xl</p>
</div>
<div><p>Love this lunch pot! Keeps my food hot for hours and no leaks at all. Perfect for work.</p></div>

      </div>
      
     <button className="hover:bg-slate-200 border px-3 py-2 rounded-2xl  transition duration-200 mr-4 cursor-pointer">Helpful</button>
     <button className="hover:bg-slate-200 border px-3 py-2 rounded-2xl  transition duration-200 mr-4 cursor-pointer">Report</button>
     
     </div>
     
      </div>
         
         {/* Display Related Product  */}
         <RelatedProduct category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
