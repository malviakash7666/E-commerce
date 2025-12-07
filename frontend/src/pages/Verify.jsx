import React, { useContext, useEffect } from 'react'
import {shopContext} from "../context/ShopContext"
import {  useSearchParams } from 'react-router-dom';
import axios from 'axios';
const Verify = () => {
  const {token,navigate,setCardItems} = useContext(shopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderid = searchParams.get('orderId');
  const verifyPayment = async() =>{

    try {
      if(!token){
        return null;
      }

      const response = await axios.post('http://localhost:4000/api/order/verifyStrip',{success,orderid},{headers:{token : token}});
      console.log(response)
      if(response.data.success){
        setCardItems({});
        navigate("/orders")
      } else{
         navigate("/cart")
      }
    } catch (error) {
      console.log(error)
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