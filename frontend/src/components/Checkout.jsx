import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiDocumentText } from 'react-icons/hi';
import { useState } from "react";
import { FaTruck, FaHome, FaLeaf, FaCheckCircle } from 'react-icons/fa';

const Checkout = () => {
  const navig = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const deli = [
    {name: "Fast Delivery", price:'₹10',des: "Within 6 Hours", icon:<FaTruck color="gray"/>},
    {name: "Standard Delivery", price:'₹20',des: "In 2-3 Hours", icon:<FaHome color='#0084D1'/>},
    {name: "Eco Delivery", price:'₹30',des: "In 4-5 Hours", icon:<FaLeaf color='green'/>}
  ]
  const [selected, setSelected] = useState(null);
  return (
    <div className='text-black w-screen pt-5 -mx-[18px] px-5 bg-gray-100'>
      <div className='flex flex-col gap-4 mb-[4rem]'>
        <div><button className='flex flex-row items-center gap-2 hover:bg-gray-200 transition-colors duration-200 p-1.5 cursor-pointer rounded-xl text-lg font-normal'><HiArrowLeft/>Back to Cart</button></div>
        <div className='flex flex-col gap-0.5'>
          <h1 className='text-3xl font-semibold'>Checkout</h1>
          <h1 className='text-base font-normal opacity-70'>Complete your purchase securely</h1>
        </div>
      </div>
      <section className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2 p-[2rem] rounded-xl mb-[2rem] bg-white'>
          <div className='flex flex-row items-center gap-2 text-base font-semibold mb-3'>
            <HiDocumentText/>
            <h1>Order Summary</h1>
          </div>
          <hr className='border-gray-400 opacity-50'/>
          <div className='flex flex-col gap-2.5 text-sm my-2'>
            <div className='flex flex-row justify-between font-semibold'>
              <h1 className='opacity-40 font-normal'>Subtotal</h1>
              <p>₹10</p>
            </div>
            <div className='flex flex-row justify-between font-semibold'>
              <h1 className='opacity-40 font-normal'>Delivery</h1>
              <p>₹10</p>
            </div>
            <div className='flex flex-row justify-between font-semibold'>
              <h1 className='opacity-40 font-normal'>Tax</h1>
              <p>₹10</p>
            </div>
          </div>
          <hr className='border-gray-400 opacity-50'/>
          <div className='flex flex-row justify-between my-2 text-lg font-medium'>
            <h1>Total</h1>
            <h1>₹30</h1>
          </div>
          <div className='flex flex-row gap-3'>
            <input
            className='bg-gray-100 p-1.5 text-sm rounded-lg font-normal'
            placeholder='Enter Coupen Code'/>
            <button className='bg-gray-100 p-1.5 rounded-lg cursor-pointer text-sm'>Apply</button>
          </div>
        </div>
        <div>
          <form>
            <div className='p-[2rem] rounded-2xl bg-white'>
              <div className='flex flex-row text-lg items-center gap-2 mb-4 font-medium'>
                <FaTruck/>
                <h1>Delivery Option</h1>
              </div>
              <div className="flex gap-4 flex-col ">
                {deli.map((deliv, index) => (
                  <div
                    onClick={() => setSelected(index)}
                    key={index}
                    className={`flex flex-row gap-5 p-3 border-2 border-gray-200 justify-between rounded-xl cursor-pointer hover:shadow-lg transition ${selected === index ? "border-red-800, bg-red-100" : "border-gray-200 hover:shadow-lg"}`}
                  >
                    <div className='flex flex-row gap-5'>
                      <div className='flex justify-center text-xl items-center'>{deliv.icon}</div>
                        <div className='flex flex-col gap-1'>
                          <div className='flex flex-col gap-0.5'>
                            <span className="text-sm font-medium">{deliv.name}</span>
                            <span className="text-xs font-normal opacity-60">{deliv.des}</span>
                          </div>
                          <span className="text-sm font-medium">{deliv.price}</span>
                        </div>
                    </div>
                      <FaCheckCircle className={`${
                        selected === index ? "text-blue-500" : "text-gray-300"
                      }`}/>
                  </div>
                ))}
              </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Checkout