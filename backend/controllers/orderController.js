import Order from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import Stripe from "stripe";

import razorpay from "razorpay";
// global variable
const currency = "usd";
const deliveryCharges = 10;
// gatewave initilize
const stripe = new Stripe(process.env.STRIP_SECRETE_KEY);

// razorpayInstance 

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_API_ID,
  key_secret:process.env.RAZORPAY_SECRETE,
})

// place order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "order placed",
      paymentMehod: "cod",
      payment: false,
      date: Date.now(),
    };
    await Order.create(orderData);

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Order placed",
    });
  } catch (error) {
    console.log("order paced cod :", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// place order using strip
export const placeOrderStrip = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "order placed",
      paymentMehod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = await Order.create(orderData);

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// verify strip

export const verifyStrip = async (req, res) => {
  const { userId, success, orderId } = req.body;

  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    }
    else{
      await Order.findByIdAndDelete(orderId);
      res.json({success:false })
    }
  } catch (error) {
     res.json({
      success: false,
      message: error.message,
    });
  }
};

// place order using razorpay
export const placeOrderRazorpay = async (req, res) => {
  try {
     const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
    
      paymentMehod: "razorpay",
      payment: false,
      date: Date.now(),
    };
  const newOrder = await Order.create(orderData);

    

    const options = {
      amount:amount * 100,
      currency:currency.toUpperCase(),
      receipt:newOrder._id.toString()

    }

    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error)
        return res.json({success:false,message:error})
      }
      res.json({success:true,order});
    })

  } catch (error)
   {
    console.log("order paced razorpay :", error);
    res.json({
      success: false,
      message: error.message,
  })
};
}

// verify razorpay 
export const verifyRazorpay = async (req,res) => {
  try {
    const {razorpay_order_id} = req.body;
    const userId = req.userId;
    console.log(userId)
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status === "paid"){
      console.log(orderInfo)
      await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      await User.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true,message:"Payment successfull"})
    }
    else{
      res.json({success:false,message:"Payment failed"})
    }
  } catch (error) {
     res.json({
      success: false,
      message: error.message,
    });
  }
  
}

// all orderds by admin pannel
export const allOrderAdmin = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// all orderds by user pannel
export const allOrderUser = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId });
    console.log(orders);
    res.json({ sucess: true, orders });
  } catch (error) {
    console.log("order paced cod :", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// order status
export const orderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ sucess: true, message: "Status Updated" });
  } 
  catch (error) {
    res.status(400).json({ sucess: false, message: error.message });
  }
}
