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
  const tax = cartItems.reduce(
    (acc, item) => acc + (10 * item.quantity),
    0
  );
  const total = subTotal + tax

  const handleCartCheckout = (items) => {
    const total = items.reduce((acc, i) => acc + (i.price) * i.quantity, 0);
    const tax = items.reduce((acc, i) => acc + (10 * i.quantity), 0);
    const grandTotal = total + tax;

    navig("/checkout", {
      state: {
        cartItems: items,
        total,
        tax,
        grandTotal,
      },
    });
  };

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
            className="inline-flex items-center gap-2 bg-black active:scale-97 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-6 text-sm sm:text-base md:text-lg rounded-lg transition-colors duration-200 cursor-pointer"
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
    <div className="min-h-screen  bg-[#FEFFFF] text-black w-screen pt-5 -mx-[18px] px-5 text-black">
      <div className='flex flex-col gap-4 mb-[4rem] max-w-[1280px] mx-auto'>
        <div><button onClick={() => navig(-1)} className='flex flex-row items-center gap-2 hover:bg-gray-200 transition-colors duration-200 p-1.5 cursor-pointer rounded-xl text-lg font-normal'><HiArrowLeft/>Back</button></div>
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
              <p>₹{subTotal}</p>
            </div>
            <div className='flex flex-row justify-between font-semibold'>
              <h1 className='opacity-40 font-normal'>Tax</h1>
              <p>₹{tax}</p>
            </div>
          </div>
          <hr className='border-gray-400 opacity-50'/>
          <div className='flex flex-row justify-between my-2 text-lg font-medium'>
            <h1>Total</h1>
            <h1>₹ {total.toFixed(2)}</h1>
          </div>
          <div className='flex flex-row gap-3 justify-center'>
            <input
            className='flex-1 bg-gray-100 p-3 text-sm rounded-lg font-normal'
            placeholder='Enter Coupen Code'/>
            <button className='bg-gray-100 p-2 rounded-lg cursor-pointer text-sm'>Apply</button>
          </div>
        </div>

        <div className='max-w-[958px] lg:max-w-[842px] w-full'>
          <div className="flex flex-row justify-between sm:px-[3rem] px-2 text-sm sm:text-base font-normal opacity-70">
            <div>
              <h1>Product</h1>
            </div>
            <div className="flex flex-row gap-3 sm:gap-15">
               <h1>Price</h1>
               <h1>Quantity</h1>
               <h1>Total</h1>
            </div>
          </div>
          {cartItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-row justify-between items-center gap-4 border-b border-gray-400 py-2"
              >
                <div className="flex flex-row items-center">
                  <img
                    src={item.image || item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 sm:w-22 sm:h-22 object-contain"
                  />
                  <h2 className="text-sm font-normal sm:font-medium sm:text-lg">{item.title}</h2>
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-row gap-5 sm:gap-19 sm:pr-4 text-xs sm:text-base font-normal">
                    <p>
                      ₹{item.price}
                    </p>
                    <p>{item.quantity}</p>
                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 absolute -right-3 sm:static cursor-pointer font-semibold sm:text-3xl"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 mb-5 flex justify-end">
              <button
                onClick={() => handleCartCheckout(cartItems)}
                className=" bg-black text-white px-3 py-2 rounded-lg font-medium sm:font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
