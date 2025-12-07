import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="w-full sm:max-w-[450px] " />
        <div className="flex flex-col  justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Our mission is to provide customers with an online shopping experience that is simple, reliable, and completely secure. We believe everyone deserves high-quality products at fair prices, and our team works every day to deliver exactly that — from fast delivery to easy returns and dedicated customer support.</p>
          <p>We started this e-commerce store with a simple idea — to make quality products accessible to everyone. Since day one, our focus has been on trust, quality, and customer satisfaction. Because of this commitment, we are becoming the first choice of thousands of customers.</p>
          <b className="text-gray-600">Our Mission</b>
          <p>Our mission is to make online shopping simple, trustworthy, and accessible for everyone. We aim to deliver high-quality products at fair prices while ensuring a smooth, secure, and enjoyable shopping experience. Customer satisfaction guides every decision we make.</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 ">
        <div className="border px-10 md:px-16 py-8 sm:py-8 flex flex-col gap-5 border-gray-400">
          <b className="text-xl">Qulity Assurence:</b>
          <p className="text-gray-600 text-sm">We are committed to delivering products that meet the highest standards of quality. Every item listed on our platform goes through a careful selection process to ensure authenticity, durability, and value for money. Our team continuously reviews suppliers, checks product performance, and monitors customer feedback to maintain consistent quality and complete transparency.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-8 flex flex-col gap-5 border-gray-400">
          <b className="text-xl">Convinence:</b>
          <p className="text-gray-600 text-sm">We believe shopping should be quick, easy, and stress-free. Our platform is designed to give you a smooth experience — from browsing products to placing your order in just a few clicks. With simple navigation, secure payments, and fast delivery, we make online shopping effortless for everyone.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-8 flex flex-col gap-5 border-gray-400">
          <b className="text-xl">Exceptional Customer Service:</b>
          <p className="text-gray-600 text-sm">We are dedicated to providing support that is prompt, friendly, and truly helpful. Our customer service team is always ready to assist you — whether you need help choosing a product, tracking your order, or resolving an issue. We believe every customer deserves respect, quick responses, and clear solutions, and we work hard to deliver exactly that.</p>
        </div>
      </div>
        <NewsLetterBox />
    </div>
  );
};

export default About;
