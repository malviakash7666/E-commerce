import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { product } from "../assets/frontend_assets/assets";
const Collection = () => {
  const { products,search,showSearch } = useContext(shopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProduct] = useState([]);
  const [sortType, setSortType] = useState("relevent");
  useEffect(() => {
    if(products.length>0){

      setFilterProduct(products);
    } else{
      
      setFilterProduct(product);
    }
    
  }, [products]);
  const [category, setCategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const toggleCategory = (e) => {
   if(category.includes(e.target.value)){
    setCategory(prev=>prev.filter(item=>item !== e.target.value));
   }
   else{
    setCategory(prev=>[...prev,e.target.value])
   }


  }
  const toggleSubcategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setsubCategory(prev=>[...prev,e.target.value])
    }
  };
  const applayFillter = () => {
    let productCopy = products.length>0?products.slice(): product.slice();
   if(search && showSearch){
    productCopy = productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
   }
    if (category.length > 0) {
     productCopy = productCopy.filter(item=>category.includes(item.category))
     
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProduct(productCopy);
  };
  useEffect(() => {
    applayFillter();
  }, [category, subCategory,search,showSearch,products,product]);

  const sortProduct = () => {
    const copyFPro = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProduct(copyFPro.sort((a, b) => a.price - b.price));

        break;
      case "high-low":
        setFilterProduct(copyFPro.sort((a, b) => b.price - a.price));

        break;

      default:
        applayFillter();
        break;
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Fillter Options  */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* Catageory Filters  */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              MEN
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              WOMEN
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              KIDS
            </p>
          </div>
        </div>
        {/* Subcategory Filters  */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubcategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubcategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubcategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side  */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort  */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: low to high</option>
            <option value="high-low">Sort by: high to low</option>
          </select>
        </div>
        {/* Map Product  */}
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              key={index}
            />
          ))} 
        </div>
      </div>
    </div>
  );
};

export default Collection;
