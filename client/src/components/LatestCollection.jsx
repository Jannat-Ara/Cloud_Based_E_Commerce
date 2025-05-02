import React , {useContext, useState, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);
    
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover our Latest Collection – a fresh drop of must-have styles designed to elevate your wardrobe. From effortlessly cool everyday wear to standout statement pieces, each item is crafted with comfort, quality, and modern trends in mind. Step into the season with confidence and express your unique style with our newest arrivals.
            </p>
        </div>

        {/* Rendering Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index}  id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    
      
    </div>
  )
}

export default LatestCollection
