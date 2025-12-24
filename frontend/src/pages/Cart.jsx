import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { FaCartPlus } from "react-icons/fa";

const Cart = () => {
  const { products, currency, cartItems, updatequantity, navigate } =
    useContext(shopContext);
  const [cartData, setcartData] = useState([]);

  useEffect(() => {
   
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setcartData(tempData);
   
  }, [cartItems, products]);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {
        cartData.length>0  ?
        cartData.map((item, index) => {
          let productData 
      products
                productData =  products.find(
            (product) => product._id === item._id
          )
        
         
          
         
  return( productData &&
        
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 "
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  className="w-10 sm:w-20"
                  alt=""
                />
                <div className="text-balance sm:text-lg">
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    {currency}
                    {productData.price}
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
        
                <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updatequantity(item._id, item.size, Number(e.target.value))
                }
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border sm:max-w-20 w-10 px-1 sm:px-2 py-1"
                name=""
                id=""
              />
              <img
                onClick={() => updatequantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className="w-4 mr-4 sm:w-5  cursor-pointer"
                alt=""
              />
         
            </div>
          
        )}

        )
      :
    (
      <div className="flex w-full sm:w-[500px] gap-4 items-center h-44 mx flex-col">
      <FaCartPlus className="sm:w-[400px] sm:h-[400px] text-4xl" />
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <h2>Your Cart is  <span>Empty!</span></h2>
        <p>Your cart is waiting — start shopping to find something you’ll love.</p>
        <button className="cursor-pointer sm:w-77 bg-orange-500 hover:bg-orange-400 text-white px-5 rounded-xl py-2" onClick={()=>navigate("/collection")}>Continue Shopping</button>
        </div>
      </div>
    )  
    } 
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() =>{cartData.length > 0 && navigate("/place-order")}}
              className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer"
            >
              PROCESSED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
