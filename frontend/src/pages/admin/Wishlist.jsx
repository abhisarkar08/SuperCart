import { AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Whislist = () => {
    const navig = useNavigate();
  return (
    <div className="text-black min-h-screen flex flex-col">
        <div className='flex items-center gap-2 mt-[15px] px-3'>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-15 md:h-15 text-red-500">
                <AiOutlineHeart className="w-full h-full" />
            </div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold'>My Wishlist</h1></div>
        <div className='flex flex-col mx-auto my-auto justify-center items-center gap-3'>
            <div className="w-20 h-20 sm:w-30 sm:h-30 md:w-38 md:h-38 text-red-500">
                <AiOutlineHeart className="w-full h-full" />
            </div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>Your Wishlist is Empty</h1>
            <p className='font-medium sm:text-lg md:text-xl'>Start adding products you love to your wishlist!</p>
            <div className='rounded-lg bg-black text-white sm:px-6 sm:py-3 md:px-8 md:py-4 sm:text-base md:text-lg mt-2 p-2 font-bold'><button onClick={() => navig('/home')}className='active:scale-97 cursor-pointer'>Browse Products</button></div>
        </div>
    </div>
  )
}

export default Whislist