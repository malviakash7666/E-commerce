import { v2 as cloudinary } from "cloudinary";
import { productModel } from "../models/productModel.js";
// function for add Product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestSeller,
    } = req.body;
    if (
      (!name || !description || !price,
      !category || !subcategory || !sizes || !bestSeller)
    ) {
      res
        .status(400)
        .json({ success: false, message: "Please Provide all detail!" });
    }
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resourse_type: "image",
        });
        return result.secure_url;
      })
    );

    const product = await productModel.create({
      name,
      description,
      price:Number(price),
      category,
      subcategory,
      sizes:JSON.parse(sizes),
      bestSeller:Boolean(bestSeller === "true" ? true : false),
      image:imageUrl,
      date:Date.now()
    });

    res.status(200).json({success:true,message:"Prosuct add successfully",product})
    console.log(imageUrl);
  } catch (error) {
    console.log(error);
  }
};

// function for listing Product
export const listingProduct = async (req, res) => {
  try {
    const product = await productModel.find({})
    res.status(200).json({
      success:true,
      product
    })
  } catch (error) {
    console.log("Listining Product error:",error)
    res.status(400).json({
      success:false,
      message:"Internal Server Error"
    })
  }
};

// function for remove Product
export const removeProduct = async (req, res) => {
  const id = await productModel.findOneAndDelete(req.body.id)
  if(!id){
     res.status(404).json({
    success:true,
    message:"Product already Remove "
  })
  }
  res.status(200).json({
    success:true,
    message:"Product Remove Successfully"
  })
  try {
  } catch (error) {}
};

// function for single Product
export const singleProduct = async (req, res) => {
  const {productId} = req.body;
  const product = await productModel.findById(productId);
  if(!product){
    return res.status(404).json({
    success:true,
    message:"No product was found"
  })

  }
   res.status(200).json({
    success:true,
    product
  })
  try {
  } catch (error) {}
};
