import { FiBox } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Orders = () => {
  const navig = useNavigate();
  const [orders, setOrders] = useState([]);

  // ✅ orders localStorage se read karo
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="text-black min-h-screen flex flex-col">
      <div className='flex items-center gap-2 mt-[15px] px-3'>
        <div className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500">
          <FiBox className="w-full h-full" />
        </div>
        <h1 className='text-3xl sm:text-4xl font-semibold'>My Orders</h1>
      </div>

      {orders.length === 0 ? (
        // ✅ Agar koi order nahi hai
        <div className='flex flex-col mx-auto my-auto justify-center items-center gap-3'>
          <div className="w-20 h-20 sm:w-30 sm:h-30 text-blue-200">
            <FiBox className="w-full h-full" />
          </div>
          <h1 className='text-2xl sm:text-3xl font-semibold'>You have no orders yet</h1>
          <p className='font-medium sm:text-lg'>Start shopping and your orders will appear here!</p>
          <div className='rounded-lg bg-black text-white sm:px-6 sm:py-3 md:px-8 md:py-4 sm:text-base mt-2 p-2 font-bold'>
            <button onClick={() => navig('/home')} className='active:scale-97 cursor-pointer'>
              Shop Now
            </button>
          </div>
        </div>
      ) : (
        // ✅ Agar orders hai to render karo
        <div className="flex flex-col gap-6 p-5">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-white flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Order #{order.id || index + 1}</h2>
                <p className="text-xs opacity-60">{new Date(order.date).toLocaleString()}</p>
              </div>

              {/* ✅ Ab sirf ek product ka data dikhana hai */}
              <div className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={order.image || order.thumbnail}
                    alt={order.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                  <h3 className="text-sm sm:text-base font-medium">{order.name}</h3>
                </div>
                <div className="flex gap-4 text-xs sm:text-base">
                  <p>. qty. {order.quantity}</p>
                  <p className="font-semibold">₹{order.isDirectBuy
      ? (order.price * 87 * order.quantity).toFixed(2)
      : (order.price * order.quantity).toFixed(2)
  }</p>
                </div>
              </div>

              {/* ✅ Delivery aur total */}
              <div className="flex justify-between items-center text-sm sm:text-base">
                <p className="opacity-70">Delivery: {order.delivery}</p>
                <p className="font-bold text-base sm:text-lg">Total: ₹{(
    order.isDirectBuy 
      ? (order.price * 87 * order.quantity).toFixed(2)   // Direct buy → multiply 87
      : (
          (order.price * order.quantity) + 
          (parseFloat(order.deliveryPrice || 0)) + 
          (parseFloat(order.tax || 0))
        ).toFixed(2)   // Cart → add delivery + tax
  )}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
