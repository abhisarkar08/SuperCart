import { AiOutlineThunderbolt } from 'react-icons/ai';
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


const Home = () => {
  const navig = useNavigate();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  return (
    <div>
      <section className='bg-black w-screen -mx-[18px] -mt-[5px]'>
        <div className='max-w-[600px] mx-auto h-screen flex flex-col justify-center'>
          <div className="pt-[2rem]  flex text-xs font-semibold justify-center md:text-[0.8rem]">
            <div  className='bg-[#0F1334] border-2 border-[#1B3173] text-[#51A2FF] p-3 flex flex-row gap-1 item-center rounded-4xl'>
              <AiOutlineThunderbolt size={15} className='text-[#51A2FF] md:w-4 md:h-4 ' />
              <h1>Everything You Need, All in One Place</h1>
            </div>
          </div>
          <div className='flex flex-col  text-center mt-5'>
            <h1 className='text-[2.3rem] font-bold sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem]'>Super Cart.</h1>
            <h1 className='text-[1.5rem] font-normal bg-gradient-to-r from-blue-500 via-blue-300 to-pink-500 bg-clip-text text-transparent sm:text-[1.9rem] md:text-[2.2rem] lg:text-[2.3rem]'>Discover More.</h1>
          </div>
          <div className='px-4 md:text-[1.2rem] md:-mx-[3.5rem] lg:-mx-[4rem] mt-[1.5rem] text-center leading-[1.4rem] opacity-80 text-sm sm:text-[1.1rem] sm:leading-[1.8rem]'>
            <h1 className='sm:px-7 md:px-0 lg:-mx-[1.5rem]'>
              From cutting-edge electronics to trendy fashion, home essentials to beauty products. Find everything you need with unbeatable prices, authentic brands, and lightning-fast delivery.
            </h1>
          </div>
          <div className='mt-[2.3rem] flex flex-col gap-4 w-[90%] mx-auto sm:flex-row sm:w-[70%]'>
            <button onClick={() => navig('/electronics')} className='cursor-pointer flex-1 font-medium text-base bg-blue-200 p-2  rounded-full bg-gradient-to-r from-blue-700 to-purple-600 flex flex-row gap-2 justify-center items-center '>Shop Electronics <FiArrowRight/></button>
            <button onClick={() => navig('/fashion')} className='cursor-pointer flex-1 font-medium text-base bg-white text-black p-2 rounded-full flex flex-row gap-2 justify-center items-center '>Shop Fashion <FiArrowRight/></button>
          </div>
          <div className='hidden lg:flex flex-row justify-between mt-[2.5rem]'>
            <div className='flex flex-col gap-1 items-center'>
              <h1 className='font-semibold text-3xl'>1000+</h1>
              <h1 className='font-normal opacity-60'>Products</h1>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <h1 className='font-semibold text-3xl'>
                6
              </h1>
              <h1 className='font-normal opacity-60'>Categories</h1>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <h1 className='font-semibold text-3xl'>24/7</h1>
              <h1 className='font-normal opacity-60'>Support</h1>
            </div>
          </div>
        </div>
      </section>
      <section className='w-screen bg-gray-100 -mx-[18px] text-black'>
        <div className='pt-[5rem] text-center mb-[5rem]'>
          <h1 className='text-[2.3rem] font-semibold md:text-[3rem]'>Shop by Category</h1>
          <h1 className='text-lg mt-2 px-[1.8rem] font-medium text-gray-500'>Explore our wide range of products across different category</h1>
        </div>
        <div className='relative pb-[5rem]'>
          <button
            onClick={scrollLeft}
            className=" cursor-pointer hidden md:flex absolute left-2 top-1/3 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 lg:max-w-[1024px] xl:max-w-[1480px]"
          >
            <MdChevronLeft size={24} />
          </button>
          <div ref={sliderRef}  className=' flex overflow-x-auto gap-4 px-4 snap-x snap-mandatory no-scrollbar-x sm:max-w-[640px] mx-auto lg:max-w-[1024px] xl:max-w-[1480px]'>
            <div onClick={() => navig('/electronics')} className='cursor-pointer flex-shrink-0 h-auto w-[97%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'>
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuLaptop/></h1>
              <h1 className='text-base font-medium md:text-lg'>Electronics</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70 '>Discover the latest smartphones, laptops, tablets, and must-have accessories for your digital lifestyle.</p>
            </div>
            <div onClick={() => navig('/homeappli')} className='cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'>
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuHouse/></h1>
              <h1 className='text-base font-medium md:text-lg'>Home & Kitchen</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Upgrade your living space with modern furniture, stylish home decor, and essential kitchenware.</p>
            </div>
            <div onClick={() => navig('/fashion')} className=' cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'>
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuShirt/></h1>
              <h1 className='text-base font-medium md:text-lg'>Fashion</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Stay in style with the latest trends in clothing, shoes, watches and fashion accessories for all.</p>
            </div>
            <div onClick={() => navig('/groceries')} className='cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'>
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuShoppingBasket/></h1>
              <h1 className='text-base font-medium md:text-lg'>Groceries</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Shop everyday essentials and pantry favorites with fresh groceries delivered to your doorstep.</p>
            </div>
            <div onClick={() => navig('/beauty')} className='cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'>
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuMedal/></h1>
              <h1 className='text-base font-medium md:text-lg'>Beauty</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Glow up with premium skincare, cosmetics, and fragrances from top beauty brands.</p>
            </div>
            <div onClick={() => navig('/sports')} className='cursor-pointer flex-shrink-0 w-[98%] sm:max-w-[352px] lg:max-w-[360px] sm:w-1/2 lg:w-1/4 bg-white flex flex-col gap-2 p-8 rounded-xl snap-center'>
              <h1 className='p-1 bg-gray-200 w-8 h-8 text-[1.3rem] flex justify-center rounded-lg items-center md:w-9 md:h-9'><LuDumbbell/></h1>
              <h1 className='text-base font-medium md:text-lg'>Sports</h1>
              <p className='text-[0.9rem] font-normal leading-[1.4rem] opacity-70'>Gear up for action with quality sports equipment, activeware, and fitness accessories.</p>
            </div>
          </div>
          <button
            onClick={scrollRight}
            className="hidden cursor-pointer md:flex absolute right-6 top-1/3 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 lg:max-w-[1024px] xl:max-w-[1480px]"
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home