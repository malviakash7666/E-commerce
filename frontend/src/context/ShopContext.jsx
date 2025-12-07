import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import React from "react";
import { toast } from "react-toastify";
export const shopContext = createContext();
import {useNavigate} from 'react-router-dom'

const ShopContxtProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cardItems, setCardItems] = useState({});

  const navigate = useNavigate()

  const addToCard = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    let cardData = structuredClone(cardItems);
    if (cardData[itemId]) {
      if (cardData[itemId][size]) {
        cardData[itemId][size] += 1;
      } else {
        cardData[itemId][size] = 1;
      }
    } else {
      cardData[itemId] = {};
      cardData[itemId][size] = 1;
    }
    setCardItems(cardData);
  };


  const getCardCount = () => {
    let count = 0;
    for (let items in cardItems) {
      for (const item in cardItems[items]) {
        try {
          if (cardItems[items][item] > 0) {
            count += cardItems[items][item];
          }
        } catch (error) {}
      }
    }
    return count;
  };

  const updateQuntity = (itemId,size,quntity) => {
    const cardData = structuredClone(cardItems)
    cardData[itemId][size] = quntity
    setCardItems(cardData)
  }


const getCartAmount = () =>{
  let totalAmount = 0;
  for(const items in cardItems){
    let itemInfo = products.find((product)=>product._id === items)
    for(const item in cardItems[items]){
      try {
        if(cardItems[items][item] > 0){
          totalAmount += itemInfo.price * cardItems[items][item]

        }
      } catch (error) {
        
      }
    }
  }
  return totalAmount
}


  const currency = "$";
  const delivery_fee = 10;
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cardItems,
    addToCard,
    getCardCount,
    updateQuntity,
    getCartAmount,
    navigate
  };
  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
};

export default ShopContxtProvider;
