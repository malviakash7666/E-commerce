import React, { useContext, useEffect } from 'react'
import {shopContext} from "../context/ShopContext"
import {  useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Verify = () => {
  const {token,navigate,setcartItems,backendUrl} = useContext(shopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderid = searchParams.get('orderId');
  const verifyPayment = async() =>{

    try {
      if(!token){
        return null;
      }

      const response = await axios.post(`${backendUrl}/api/order/verifyStrip`,{success,orderid},{headers:{token : token}});
 
      if(response.data.success){
        setcartItems({});
        navigate("/orders")
      } else{
         navigate("/cart")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
   verifyPayment()
  }, [token])
  
  
 
  return (
    <div>Verify</div>
  )
}

export default Verify