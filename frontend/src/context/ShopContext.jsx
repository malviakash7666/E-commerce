import { createContext, useEffect, useState } from "react";

import React from "react";
import { toast } from "react-toastify";
export const shopContext = createContext();
import {useNavigate} from 'react-router-dom'
import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContxtProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
  const [products,setProducts] = useState([])
  const [token,setToken] = useState('')
  const navigate = useNavigate()

  const addToCard = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setcartItems(cartData);
    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/add`,{itemId,size},{headers:{token}})
       
       
      } catch (error) {
       console.log(error)
        toast.error(error.response.data.message)
      }
    }
  };


  const getCardCount = () => {
    let count = 0;
    for (let items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            count += cartItems[items][item];
          }
        } catch (error) {
          console.log("Error:",error)
        }
      }
    }
    return count;
  };

  const updatequantity = async (itemId,size,quantity) => {
    const cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setcartItems(cartData)
    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/update`,{itemId,size,quantity},{headers:{token}})
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }


const getCartAmount = () =>{
  let totalAmount = 0;
  for(const items in cartItems){
    let itemInfo =products.find((pro)=>pro._id === items)
    for(const item in cartItems[items]){
      try {
        if(cartItems[items][item] > 0){
          totalAmount += itemInfo.price * cartItems[items][item]

        }
      } catch (error) {
        console.log("error:",error)
      }
    }
  }
  return totalAmount
}

const getUserCard = async (token) => {

  try {
    const response = await axios.get(`${backendUrl}/api/cart/get`,{headers:{
      token:token
    }}) 
    console.log(response)
    if(response.data.success){
      setcartItems(response.data.cartData)
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }
  
}


  const currency = "$";
  const delivery_fee = 10;


  const getAllProduct = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log(response)
      if(response.data.success){
        setProducts(response.data.product);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  }
useEffect(()=>{
  
  getAllProduct()},[])

useEffect(()=>{
  if(!token && localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
    getUserCard(localStorage.getItem('token'))
    console.log(localStorage.getItem('token'))
  }
},[token])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCard,
    getCardCount,
    updatequantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    setcartItems,
    backendUrl
  };
  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
};

export default ShopContxtProvider;
