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
        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-15 md:h-15 text-blue-500">
          <FiBox className="w-full h-full" />
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold'>My Orders</h1>
      </div>

      {orders.length === 0 ? (
        // ✅ Agar koi order nahi hai
        <div className='flex flex-col mx-auto my-auto justify-center items-center gap-3'>
          <div className="w-20 h-20 sm:w-30 sm:h-30 md:w-38 md:h-38 text-blue-200">
            <FiBox className="w-full h-full" />
          </div>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>You have no orders yet</h1>
          <p className='font-medium sm:text-lg md:text-xl'>Start shopping and your orders will appear here!</p>
          <div className='rounded-lg bg-black text-white sm:px-6 sm:py-3 md:px-8 md:py-4 sm:text-base md:text-lg mt-2 p-2 font-bold'>
            <button onClick={() => navig('/home')} className='active:scale-97 cursor-pointer'>Shop Now</button>
          </div>
        </div>
      ) : (
        // ✅ Agar orders hai to render karo
        <div className="flex flex-col gap-4 p-5">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-lg font-semibold">{order.name}</h2>
              <p className="text-sm opacity-70">Order ID: {order.id}</p>
              <p className="text-sm">Quantity: {order.quantity}</p>
              <p className="text-sm">Delivery: {order.delivery}</p>
              <p className="text-sm">Total: ₹{order.total}</p>
              <p className="text-xs opacity-60">Date: {new Date(order.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
