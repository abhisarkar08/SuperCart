import { AiOutlineThunderbolt, AiOutlineSafety, AiOutlineWallet, AiOutlineCustomerService } from 'react-icons/ai';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { 
  LuLaptop,        
  LuHouse,        
  LuShirt,         
  LuShoppingBasket,
  LuMedal,         
  LuDumbbell       
} from "react-icons/lu";
import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { HiOutlineRefresh, HiOutlineBadgeCheck, HiOutlineTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";


const Home = () => {
  const navig = useNavigate();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  const location = useLocation();
  const products = useSelector((state) => state.productReducer.products);
  const category = location.state?.fromCategory || null;

  let featuredProducts = [...products];

  if (category) {
    // Filter by category
    const categoryMap = {
      beauty: ["beauty", "fragrances"],
      fashion: ["mens-shirts", "womens-dresses", "womens-shoes", "mens-shoes","womens-watches", "mens-watches", "sunglasses", "womens-jewellery", "womens-bags"],
      electronics: ["smartphones", "laptops", "tablets"],
      sports: ["sports-accessories"],
      groceries: ["groceries"],
      homeappli: ["home-decoration", "furniture", "kitchen-accessories"]
    };
    const allowedCategories = categoryMap[category] || [category];
    featuredProducts = featuredProducts.filter(p =>
      allowedCategories.includes(p.category.toLowerCase())
    );
  }
  featuredProducts = featuredProducts.sort(() => 0.5 - Math.random());
  featuredProducts = featuredProducts.slice(0, 8);
  
  const specialProducts = [...products]
    .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
    .slice(0, 4);

  const topProducts = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8);


  return (
    <div>
      <section className='bg-black w-screen -mx-[18px] -mt-[5px]'>
        <div className='max-w-[600px] mx-auto h-screen flex flex-col justify-center'>
          <motion.div className="pt-[2rem]  flex text-xs font-semibold justify-center md:text-[0.8rem]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div  className='bg-[#0F1334] border-2 border-[#1B3173] text-[#51A2FF] p-3 flex flex-row gap-1 item-center rounded-4xl'>
              <AiOutlineThunderbolt size={15} className='text-[#51A2FF] md:w-4 md:h-4 ' />
              <h1>Everything You Need, All in One Place</h1>
            </div>
          </motion.div>
          <div className='flex flex-col  text-center mt-5'>
            <motion.h1
              className='text-[2.3rem] font-bold sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem]'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Super Cart.
            </motion.h1>

            <motion.h1
              className='text-[1.5rem] font-normal bg-gradient-to-r from-blue-500 via-blue-300 to-pink-500 bg-clip-text text-transparent sm:text-[1.9rem] md:text-[2.2rem] lg:text-[2.3rem]'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Discover More.
            </motion.h1>
          </div>
          <motion.div
        className='px-4 md:text-[1.2rem] md:-mx-[3.5rem] lg:-mx-[4rem] mt-[1.5rem] text-center leading-[1.4rem] opacity-80 text-sm sm:text-[1.1rem] sm:leading-[1.8rem]'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h1 className='sm:px-7 md:px-0 lg:-mx-[1.5rem]'>
          From cutting-edge electronics to trendy fashion, home essentials to beauty products. 
          Find everything you need with unbeatable prices, authentic brands, and lightning-fast delivery.
        </h1>
      </motion.div>
          <div className='mt-[2.3rem] flex flex-col gap-4 w-[90%] mx-auto sm:flex-row sm:w-[70%]'>
            <motion.button 
              onClick={() => navig('/products/electronics')} 
              className='cursor-pointer flex-1 font-medium text-base bg-blue-200 p-2  rounded-full bg-gradient-to-r from-blue-700 to-purple-600 flex flex-row gap-2 justify-center items-center '
              initial ={{opacity:0, y:30}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.8, delay:0.9}}
            >
              Shop Electronics 
              <FiArrowRight/>
            </motion.button>
            <motion.button 
              onClick={() => navig('/products/fashion')} 
              className='cursor-pointer flex-1 font-medium text-base bg-white text-black p-2 rounded-full flex flex-row gap-2 justify-center items-center '
              initial ={{opacity:0, y:30}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.8, delay:0.9}}
            >
              Shop Fashion <FiArrowRight/>
            </motion.button>
          </div>
          <div className='hidden lg:flex flex-row justify-between mt-[2.5rem]'>
            <motion.div 
              className='flex flex-col gap-1 items-center'
              initial={{opacity:0, y:30}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.8, delay:1}}
            >
              <h1 className='font-semibold text-3xl'>1000+</h1>
              <h1 className='font-normal opacity-60'>Products</h1>
            </motion.div>
            <motion.div 
              className='flex flex-col gap-1 items-center'
              initial={{opacity:0, y:30}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.8, delay:1.3}}
            >
              <h1 className='font-semibold text-3xl'>
                6
              </h1>
              <h1 className='font-normal opacity-60'>Categories</h1>
            </motion.div >
            <motion.div  
              className='flex flex-col gap-1 items-center'
              initial={{opacity:0, y:30}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.8, delay:1.6}}
            >
              <h1 className='font-semibold text-3xl'>24/7</h1>
              <h1 className='font-normal opacity-60'>Support</h1>
            </motion.div >
          </div>
        </div>
      </section>
      <section className='hidden md:flex flex-col w-screen -mx-[18px] text-black'>
        <div className='flex flex-col pt-[3rem] text-center mx-auto max-w-[768px] lg:max-w-[1024px] xl:max-w-[1400px]'>
          <motion.h1
            className='text-[2.2rem] mb-2 font-bold'
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, delay:0.5}}
          >
            Why Shop With SuperCart?
          </motion.h1>
          <motion.h1
           className='px-22 lg:px-[8%] text-[1rem] font-normal opacity-70'
           initial={{opacity:0, y:30}}
           animate={{opacity:1, y:0}}
           transition={{duration:0.8, delay:0.8}}
           
          >
            Experience premium shopping with trusted quality, best prices, and 24/7 support — all in one place.
          </motion.h1>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-[4rem] mx-auto mb-[5rem] max-w-[768px] lg:max-w-[1024px] lg:grid-cols-3 lg:max-w-[1400px] xl:grid-cols-6'>
          <motion.div
           className='flex flex-col items-center gap-2 p-2 text-center group'
           initial={{opacity:0, y:30}}
           animate={{opacity:1, y:0}}
           transition={{duration:0.8, delay:0.9}}
          >
            <div className='text-[2rem] bg-gray-100 p-4 rounded-full transition-colors duration-200 group-hover:bg-gray-200'><AiOutlineSafety/></div>
            <h1 className='text-[1.1rem] font-medium'>Secure Shopping</h1>
            <h1 className='text-[1rem] font-normal opacity-50'>100% secure payment with SSL encryption</h1>
          </motion.div>
          <motion.div 
            className='flex flex-col items-center gap-2 p-2 text-center group'
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, delay:1}}
          >
            <div className='text-[2rem] bg-gray-100 p-4 rounded-full transition-colors duration-200 group-hover:bg-gray-200'><AiOutlineWallet/></div>
            <h1 className='text-[1.1rem] font-medium'>Flexible Payments</h1>
            <h1 className='text-[1rem] font-normal opacity-50'>Multiple payment options for your convenience</h1>
          </motion.div>
          <motion.div
           className='flex flex-col items-center gap-2 p-2 text-center group'
           initial={{opacity:0, y:30}}
           animate={{opacity:1, y:0}}
           transition={{duration:0.8, delay:1.1}}
           >
            <div className='text-[2rem] bg-gray-100 p-4 rounded-full transition-colors duration-200 group-hover:bg-gray-200'><HiOutlineRefresh/></div>
            <h1 className='text-[1.1rem] font-medium'>Easy Returns</h1>
            <h1 className='text-[1rem] font-normal opacity-50'>30-day hassle-free return policy</h1>
          </motion.div>
          <motion.div
           className='flex flex-col items-center gap-2 p-2 text-center group'
           initial={{opacity:0, y:30}}
           animate={{opacity:1, y:0}}
           transition={{duration:0.8, delay:1.2}}
           >
            <div className='text-[2rem] bg-gray-100 p-4 rounded-full transition-colors duration-200 group-hover:bg-gray-200'><HiOutlineBadgeCheck/></div>
            <h1 className='text-[1.1rem] font-medium'>Quality Guarantee</h1>
            <h1 className='text-[1rem] font-normal opacity-50'>Authentic products from trusted brands</h1>
          </motion.div>
          <motion.div 
          className='flex flex-col items-center gap-2 p-2 text-center group'
          initial={{opacity:0, y:30}}
           animate={{opacity:1, y:0}}
           transition={{duration:0.8, delay:1.3}}
          >
            <div className='text-[2rem] bg-gray-100 p-4 rounded-full transition-colors duration-200 group-hover:bg-gray-200'><AiOutlineCustomerService/></div>
            <h1 className='text-[1.1rem] font-medium'>24/7 Support</h1>
            <h1 className='text-[1rem] font-normal opacity-50'>Round-the-clock customer service</h1>
          </motion.div>
          <motion.div
           className='flex flex-col items-center gap-2 p-2 text-center group'
           initial={{opacity:0, y:30}}
           animate={{opacity:1, y:0}}
           transition={{duration:0.8, delay:1.4}}
           
           >
            <div className='text-[2rem] bg-gray-100 p-4 rounded-full transition-colors duration-200 group-hover:bg-gray-200'><HiOutlineTrendingUp/></div>
            <h1 className='text-[1.1rem] font-medium'>Best Prices</h1>
            <h1 className='text-[1rem] font-normal opacity-50'>Competitive prices and daily deals</h1>
          </motion.div>
        </div>
      </section>
      <section className='w-screen bg-gray-100 -mx-[18px] text-black'>
        <div className='pt-[5rem] text-center mb-[5rem]'>
          <motion.h1 
            className='text-[2.3rem] font-semibold md:text-[3rem]'
            initial={{ opacity: 0, y: 30 }}     
            whileInView={{ opacity: 1, y: 0 }}     
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: true, amount: 0.2 }} 
          >
            Shop by Category
          </motion.h1>
          <motion.h1 
            className='text-lg mt-2 px-[1.8rem] font-medium text-gray-500'
            initial={{ opacity: 0, y: 30 }}     
            whileInView={{ opacity: 1, y: 0 }}     
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }} 
          >
            Explore our wide range of products across different category
          </motion.h1>
        </div>
        <div className='relative pb-[5rem]'>
          <button
            onClick={scrollLeft}
            className=" cursor-pointer hidden md:flex absolute left-2 top-1/3 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 lg:max-w-[1024px] xl:max-w-[1480px]"
          >
            <MdChevronLeft size={24} />
          </button>
          <div ref={sliderRef}  className=' flex overflow-x-auto gap-4 px-4 snap-x snap-mandatory no-scrollbar-x sm:max-w-[640px] mx-auto lg:max-w-[1024px] xl:max-w-[1480px]'>
            <motion.div 
              onClick={() => navig('/electronics')} 
              className='cursor-pointer flex-shrink-0 h-auto w-[97%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'
              initial={{ opacity: 0, y: 50 }}     
              whileInView={{ opacity: 1, y: 0 }}     
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuLaptop/></h1>
              <h1 className='text-base font-medium md:text-lg'>Electronics</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70 '>Discover the latest smartphones, laptops, tablets, and must-have accessories for your digital lifestyle.</p>
            </motion.div>
            <motion.div 
              onClick={() => navig('/homeappli')} 
              className='cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'
              initial={{ opacity: 0, y: 50 }}     
              whileInView={{ opacity: 1, y: 0 }}     
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuHouse/></h1>
              <h1 className='text-base font-medium md:text-lg'>Home & Kitchen</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Upgrade your living space with modern furniture, stylish home decor, and essential kitchenware.</p>
            </motion.div>
            <motion.div 
              onClick={() => navig('/fashion')} 
              className=' cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'
              initial={{ opacity: 0, y: 50 }}     
              whileInView={{ opacity: 1, y: 0 }}     
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              >
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuShirt/></h1>
              <h1 className='text-base font-medium md:text-lg'>Fashion</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Stay in style with the latest trends in clothing, shoes, watches and fashion accessories for all.</p>
            </motion.div>
            <motion.div 
              onClick={() => navig('/groceries')} 
              className='cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'
              initial={{ opacity: 0, y: 50 }}     
              whileInView={{ opacity: 1, y: 0 }}     
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              >
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuShoppingBasket/></h1>
              <h1 className='text-base font-medium md:text-lg'>Groceries</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Shop everyday essentials and pantry favorites with fresh groceries delivered to your doorstep.</p>
            </motion.div>
            <motion.div 
              onClick={() => navig('/beauty')} 
              className='cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'
              initial={{ opacity: 0, y: 50 }}     
              whileInView={{ opacity: 1, y: 0 }}     
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true, amount: 0.2 }}
              >
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuMedal/></h1>
              <h1 className='text-base font-medium md:text-lg'>Beauty</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Glow up with premium skincare, cosmetics, and fragrances from top beauty brands.</p>
            </motion.div>
            <motion.div 
              onClick={() => navig('/sports')} 
              className='cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'
              initial={{ opacity: 0, y: 50 }}     
              whileInView={{ opacity: 1, y: 0 }}     
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              >
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuDumbbell/></h1>
              <h1 className='text-base font-medium md:text-lg'>Sports</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Gear up for action with quality sports equipment, activeware, and fitness accessories.</p>
            </motion.div>
          </div>
          <button
            onClick={scrollRight}
            className="hidden cursor-pointer md:flex absolute right-6 top-1/3 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 lg:max-w-[1024px] xl:max-w-[1480px]"
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </section>
      <section className='w-screen -mx-[18px] text-black w-screen pt-[3.8rem]'>
        <div className='flex flex-col mx-auto gap-4 text-center sm:max-w-[736px] lg:max-w-[992px] xl:max-w-[1282px]'>
          <h1 className='text-[2.2rem] font-semibold leading-[2.5rem] px-8 items-center flex mx-auto'>Feature Products</h1>
          <h1 className='text-[1.2rem] max-w-[611px] mx-auto opacity-80 font-normal px-12'>Discover our handpicked selection of top-rated products with amazing deals</h1>
        </div>
        <div className="grid grid-cols-1 mt-[2.5rem] px-5 mx-auto max-w-[1536px] md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className='w-screen -mx-[18px] text-black pt-[3.8rem] px-5'>
        <div className='flex flex-col gap-1 mx-auto max-w-[1536px]'>
          <h1 className='text-[2.2rem] font-semibold'>Special Offers</h1>
          <h1 className='text-[1.2rem] opacity-80 font-normal'>Limited time deals you don't want to miss</h1>
        </div>
        <div className="grid grid-cols-1 mx-auto max-w-[1536px] md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[2rem]">
          {specialProducts.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className='w-screen -mx-[18px] text-black pt-[3.8rem] px-5'>
        <div className='flex flex-col gap-1 mx-auto max-w-[1536px]'>
          <h1 className='text-[2.2rem] font-semibold'>Top Rated</h1>
          <h1 className='text-[1.2rem] opacity-80 font-normal'>Products loved by our customers</h1>
        </div>
        <div className="grid grid-cols-1 mx-auto max-w-[1536px] md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[2rem]">
          {topProducts.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home