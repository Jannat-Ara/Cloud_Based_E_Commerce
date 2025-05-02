import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'}  text2={'US'}/>

        <div className='my-10 flex flex-col md:flex-row gap-16' >
          <img  className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2?4 text-gray-600' >
            <p className='text-center'>E-closet was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p className='text-center' >Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quam repellat tenetur saepe corrupti libero rem nostrum, eaque et animi tempora accusamus exercitationem temporibus adipisci beatae consequuntur sit vel aliquam?</p>
          </div>
        </div>

        <div className='text-2xl py-4 text-left'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div> 

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Quality Assurance</b>
          <p className='text-gray-600'>We meticulously select and vet each product so that they are of the highest standard and quality. Besides that if you guys visit our store, you will get an extra large new-york style with anchoives freeeeeeeee</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Convenience</b>
          <p className='text-gray-600'>We meticulously select and vet each product so that they are of the highest standard and quality. Besides that if you guys visit our store, you will get an extra large new-york style with anchoives freeeeeeeee</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>We meticulously select and vet each product so that they are of the highest standard and quality. Besides that if you guys visit our store, you will get an extra large new-york style with anchoives freeeeeeeee</p>
          </div>
        </div>

        <NewsletterBox />

      </div>
    </div>
  )
}

export default About
