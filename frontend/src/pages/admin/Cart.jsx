// import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//     const navig = useNavigate();
    
//     return (
//         <div className='min-h-screen flex items-center justify-center p-4'>
//             <div className='text-center max-w-md mx-auto'>
//                 {/* Shopping Cart Icon - Responsive */}
//                 <div className='flex justify-center mb-4 md:mb-6'>
//                     <FaShoppingCart className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-400' />
//                 </div>
                
//                 {/* Main Heading - Responsive Font */}
//                 <h1 className='text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 md:mb-4'>
//                     Your Cart is Empty
//                 </h1>
                
//                 {/* Subtitle - Responsive Font */}
//                 <h4 className='text-md sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8'>
//                     Looks like you haven't added any items to your cart yet
//                 </h4>
                
//                 {/* Continue Shopping Button - Responsive */}
//                 <button 
//                     onClick={() => navig('/home')}
//                     className='inline-flex items-center gap-2 bg-black active:scale-97 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg rounded-lg transition-colors duration-200 cursor-pointer'
//                 >
//                     <FaArrowLeft className='text-xs sm:text-sm md:text-base' />
//                     Continue Shopping
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Cart;

import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../Store/Reducers/CartSlice";
import { HiArrowLeft, HiDocumentText } from 'react-icons/hi';

const Cart = () => {
  const navig = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    // 👇 tumhara same layout empty cart ke liye
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          {/* Shopping Cart Icon */}
          <div className="flex justify-center mb-4 md:mb-6">
            <FaShoppingCart className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
            Your Cart is Empty
          </h1>

          {/* Subtitle */}
          <h4 className="text-md sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
            Looks like you haven't added any items to your cart yet
          </h4>

          {/* Continue Shopping Button */}
          <button
            onClick={() => navig("/home")}
            className="inline-flex items-center gap-2 bg-black active:scale-97 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <FaArrowLeft className="text-xs sm:text-sm md:text-base" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // 👇 Agar cart me items hain
  return (
    <div className="min-h-screen  bg-gray-200 text-black w-screen pt-5 -mx-[18px] px-5 text-black">
      <div className='flex flex-col gap-4 mb-[4rem] max-w-[1280px] mx-auto'>
        <div><button onClick={() => navig('/cart')} className='flex flex-row items-center gap-2 hover:bg-gray-200 transition-colors duration-200 p-1.5 cursor-pointer rounded-xl text-lg font-normal'><HiArrowLeft/>Back to Cart</button></div>
        <div className='flex flex-col gap-0.5'>
          <h1 className='text-3xl font-semibold'>Cart</h1>
          <h1 className='text-base font-normal opacity-70'>Complete your purchase securely</h1>
        </div>
      </div>
      <section className='flex flex-col gap-10 lg:flex-row-reverse  max-w-[1280px] w-full mx-auto'>
        <div className='flex flex-col gap-2 p-[2rem] rounded-xl mb-[1rem] bg-white max-w-[958px] shadow-xl lg:max-w-[405px] max-h-[315px] w-full'>
          <div className='flex flex-row items-center gap-2 text-base font-semibold mb-3'>
            <HiDocumentText/>
            <h1>Order Summary</h1>
          </div>
          <hr className='border-gray-400 opacity-50'/>
          <div className='flex flex-col gap-2.5 text-sm my-2'>
            <div className='flex flex-row justify-between font-semibold'>
              <h1 className='opacity-40 font-normal'>Subtotal</h1>
              <p>₹total</p>
            </div>
            <div className='flex flex-row justify-between font-semibold'>
              <h1 className='opacity-40 font-normal'>Tax</h1>
              <p>₹140</p>
            </div>
          </div>
          <hr className='border-gray-400 opacity-50'/>
          <div className='flex flex-row justify-between my-2 text-lg font-medium'>
            <h1>Total</h1>
            <h1>₹ {subTotal.toFixed(2)}</h1>
          </div>
          <div className='flex flex-row gap-3 justify-center'>
            <input
            className='flex-1 bg-gray-100 p-3 text-sm rounded-lg font-normal'
            placeholder='Enter Coupen Code'/>
            <button className='bg-gray-100 p-2 rounded-lg cursor-pointer text-sm'>Apply</button>
          </div>
        </div>

        <div className='max-w-[958px] lg:max-w-[842px] w-full'>
          <div className="flex flex-row justify-between px-[3rem]">
            <div>
              <h1>Product</h1>
            </div>
            <div className="flex flex-row gap-15">
               <h1>Price</h1>
               <h1>Quantity</h1>
               <h1>Total</h1>
            </div>
          </div>
          {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between bg-red-200 items-center gap-4 border-b py-2"
              >
                <div className="flex flex-row items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <h2 className="font-semibold">{item.title}</h2>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-row gap-19 pr-4">
                    <p>
                      ₹ {item.price}
                    </p>
                    <p>{item.quantity}</p>
                    <p>{subTotal.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 font-semibold text-3xl"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navig("/checkout")}
          className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
