import { v2 as cloudinary } from "cloudinary";
import { productModel } from "../models/productModel.js";
// function for add Product
export const addProduct = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.files)
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    if (
      (!name || !description || !price ||
      !category || !subCategory || !sizes || !bestSeller)
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
      subCategory,
      sizes:JSON.parse(sizes),
      bestSeller:Boolean(bestSeller === "true" ? true : false),
      image:imageUrl,
      date:Date.now()
    });
    console.log(product)

    res.status(200).json({success:true,message:"Product add successfully",product})

  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:error.message
    })
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
   console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }
};

// function for remove Product
export const removeProduct = async (req, res) => {
  const {id} = req.body;
  if(!id){
    res.status(404).json({
      success:false,
      message:"Product already Remove "
  })
}
const deletedProduct = await productModel.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  res.status(200).json({
    success:true,
    message:"Product Remove Successfully"
  })
  try {
  } catch (error) { console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }
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
  } catch (error) {
     console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }

};
