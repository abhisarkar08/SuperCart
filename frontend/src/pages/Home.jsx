import { AiOutlineThunderbolt } from 'react-icons/ai';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navig = useNavigate();
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
          <div className='flex flex-row justify-between mt-[2.5rem]'>
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
    </div>
  )
}

export default Home