import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";


const Orders = () => {
  const { token, currency,backendUrl } = useContext(shopContext);
  
  const [orderData, setOrderData] = useState([]);

  const orderFeatch = async () => {
   try {
     
    if(!token){
      return null;
    }
    const response = await axios.post(`${backendUrl}/api/order/userorders`,{},{headers:{ token:token}})

    setOrderData(response.data.orders)
   } catch (error) {

    toast.error(error.message)
   }
    
  }
  useEffect(() => {
    orderFeatch()
  
   
  }, [token])
  
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div >
        { 
          orderData.reverse().map((item,index)=>{ 
            const product = item.items?.[0]
         
            return(
            
              <div key={index} className="py-4 border-b border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
                <div className="flex items-start gap-6 text-sm ">
                  <img className="w-16 sm:w-20" src={product?.image?.[0]} alt="" />
                  <div>
                    <p className="sm:text-base font-medium">{product?.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700 ">
                      <p>{currency}{product?.price}</p>
                      <p>Quintity: {product?.quantity}</p>
                      <p>Size: {product?.size}</p>
                    </div>
                    <p className="mt-2" >Date:  <span className="text-gray-400">{new Date(item?.date).toDateString()}</span></p>
                    <p className="mt-2" >paymentMehod:  <span className="text-gray-400">{item?.paymentMehod}</span></p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item?.status}</p>
                </div>
                <button onClick={orderFeatch} className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer">Track Order</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Orders;
