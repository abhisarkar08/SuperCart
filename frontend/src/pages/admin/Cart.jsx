import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navig = useNavigate();
    
    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='text-center max-w-md mx-auto'>
                {/* Shopping Cart Icon - Responsive */}
                <div className='flex justify-center mb-4 md:mb-6'>
                    <FaShoppingCart className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-400' />
                </div>
                
                {/* Main Heading - Responsive Font */}
                <h1 className='text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 md:mb-4'>
                    Your Cart is Empty
                </h1>
                
                {/* Subtitle - Responsive Font */}
                <h4 className='text-md sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8'>
                    Looks like you haven't added any items to your cart yet
                </h4>
                
                {/* Continue Shopping Button - Responsive */}
                <button 
                    onClick={() => navig('/home')}
                    className='inline-flex items-center gap-2 bg-black active:scale-97 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg rounded-lg transition-colors duration-200 cursor-pointer'
                >
                    <FaArrowLeft className='text-xs sm:text-sm md:text-base' />
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default Cart;

