import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            {/* <img src={assets.logo} className='mb-5 w-32' alt=""/> */}
            <h1><b>E-Closet</b></h1>
            <p className='w-full md:w-2/3 text-gray-600'>
            Thanks for shopping with us — where style meets comfort. Stay connected for the latest trends, exclusive offers, and fashion inspiration. Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatem hic illo consectetur, aliquam totam quas excepturi rem quis temporibus similique beatae, expedita id nobis error voluptatum officia deserunt ipsum?
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                <li>Careers</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1 573-777-0000</li>
                <li>contact@ecloset.com</li>
            </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright@ecloset.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
