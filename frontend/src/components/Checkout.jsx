import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiDocumentText } from 'react-icons/hi';
import { useState } from "react";
import { FaTruck, FaHome, FaLeaf, FaCheckCircle, FaMapMarkerAlt, FaPencilAlt, FaWallet  } from 'react-icons/fa';

const Checkout = () => {
  const navig = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const deli = [
    {name: "Fast Delivery", price:'₹10',des: "Within 6 Hours", icon:<FaTruck color="gray"/>},
    {name: "Standard Delivery", price:'₹20',des: "In 2-3 Hours", icon:<FaHome color='#0084D1'/>},
    {name: "Eco Delivery", price:'₹30',des: "In 4-5 Hours", icon:<FaLeaf color='green'/>}
  ]
  const methods = [
    { name: "Mastercard", img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { name: "Visa", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" },
    { name: "PayPal", img: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
    { name: "Apple Pay", img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Google Pay", img:"https://play-lh.googleusercontent.com/HArtbyi53u0jnqhnnxkQnMx9dHOERNcprZyKnInd2nrfM7Wd9ivMNTiz7IJP6-mSpwk" },
    { name: "UPI", img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
  ];
  const [selected, setSelected] = useState(null);
  return (
    <div className='text-black w-screen pt-5 -mx-[18px] px-5 bg-gray-100'>
      <div className='flex flex-col gap-4 mb-[4rem] max-w-[1280px] mx-auto'>
        <div><button onClick={() => navig('/cart')} className='flex flex-row items-center gap-2 hover:bg-gray-200 transition-colors duration-200 p-1.5 cursor-pointer rounded-xl text-lg font-normal'><HiArrowLeft/>Back to Cart</button></div>
        <div className='flex flex-col gap-0.5'>
          <h1 className='text-3xl font-semibold'>Checkout</h1>
          <h1 className='text-base font-normal opacity-70'>Complete your purchase securely</h1>
        </div>
      </div>
      <section className='flex flex-col gap-2 lg:flex-row-reverse  max-w-[1280px] mx-auto'>
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
        <div className='max-w-[842px]'>
          <form>
            <div className='p-[2rem] rounded-2xl bg-white mb-[3rem]'>
              <div className='flex flex-row text-lg items-center gap-2 mb-4 font-medium'>
                <FaTruck/>
                <h1>Delivery Option</h1>
              </div>
              <div className="flex gap-4 flex-col ">
                {deli.map((deliv, index) => (
                  <div
                    onClick={() => setSelected(index)}
                    key={index}
                    className={`flex flex-row gap-5 p-3 border justify-between rounded-xl cursor-pointer hover:shadow-lg transition ${selected === index ? "border border-[#5498FF] bg-[#EFF6FF]" : "border-gray-200 hover:shadow-lg"}`}
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
            <div className='bg-white p-5 rounded-xl'>
              <div className='flex flex-row gap-2 items-center'>
                <FaMapMarkerAlt className='text-red-400'/>
                <h1 className='text-xl font-medium'>Shipping Information</h1>
              </div>
              <div className='flex flex-col gap-2 my-[1.5rem]'>
                <div className='flex flex-col gap-0.5'>
                  <label className='text-sm font-medium opacity-70'>Country</label>
                  <input
                  {...register("country", {required: true})}
                  type='text'
                  placeholder='Country'
                  className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                  {errors.country &&(
                    <p className='text-xs'>Please Enter Country</p>
                  )}
                </div>
                <div className='flex flex-col gap-0.5'>
                  <label className='text-sm font-medium opacity-70'>City</label>
                  <input
                  {...register("city", {required: true})}
                  type='text'
                  placeholder='City'
                  className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                  {errors.city &&(
                    <p className='text-xs'>Please Enter City</p>
                  )}
                </div>
                <div className='flex flex-col gap-0.5'>
                  <label className='text-sm font-medium opacity-70'>Street Address</label>
                  <input
                  {...register("street", {required: true})}
                  type='text'
                  placeholder='Street Address'
                  className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                  {errors.street &&(
                    <p className='text-xs'>Please Enter Street Address</p>
                  )}
                </div>
                <div className='flex flex-col gap-0.5'>
                  <label className='text-sm font-medium opacity-70'>Area</label>
                  <input
                  {...register("Area", {required: true})}
                  type='text'
                  placeholder='area'
                  className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                  {errors.area &&(
                    <p className='text-xs'>Please Enter Area</p>
                  )}
                </div>
                <div className='flex flex-col gap-0.5'>
                  <label className='text-sm font-medium opacity-70'>Postal Code</label>
                  <input
                  {...register("code", {required: true})}
                  type='number'
                  placeholder='Postal Code'
                  className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                  {errors.code &&(
                    <p className='text-xs'>Please Enter Postal Code</p>
                  )}
                </div>
                <hr className='border-gray-400 opacity-50 my-[1rem] '/>
                <button className='flex flex-row gap-2 items-center text-sm font-medium opacity-60 cursor-pointer'>
                  <FaPencilAlt />
                  <h1>Use Saved Address</h1>
                </button>
              </div>
            </div>
            <div className='bg-white p-5 rounded-xl my-[2.5rem]'>
              <div className='flex flex-row gap-2 text-base font-medium items-center'>
                <FaWallet className='text-blue-500'/>
                <h1>Payment Method</h1>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-[2rem]">
                {methods.map((method, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-18 h-18 border-2 border-gray-200 rounded-xl cursor-pointer hover:shadow-lg transition"
                  >
                    <img src={method.img} alt={method.name} className="h-4 mb-2" />
                    <span className="text-xs font-medium">{method.name}</span>
                  </div>
                ))}
              </div>
              <div className='flex flex-col gap-5 mt-[2.5rem] mb-[1rem]'>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-sm font-medium opacity-70'>Name</label>
                    <input
                    {...register("name", {required: true})}
                    type='text'
                    placeholder='Name'
                    className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                    {errors.street &&(
                      <p className='text-xs'>Please Enter Name</p>
                    )}
                </div>
                <div className='flex flex-col gap-0.5'>
                  <label className='text-sm font-medium opacity-70'>Card Number</label>
                  <input
                  {...register("card", {required: true})}
                  type='number'
                  placeholder='1234 5678 9012 3456'
                  className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                  {errors.street &&(
                    <p className='text-xs'>Please Enter Card Number</p>
                  )}
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='flex flex-col gap-0.5'>
                    <label className='text-sm font-medium opacity-70'>Expiry Date</label>
                    <input
                    {...register("exp", {required: true})}
                    type='number'
                    placeholder='MM/YY'
                    className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                    {errors.street &&(
                      <p className='text-xs'>Please Enter Expiry Date</p>
                    )}
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <label className='text-sm font-medium opacity-70'>CVV</label>
                    <input
                    {...register("cvv", {required: true})}
                    type='number'
                    placeholder='CVV'
                    className='p-2 text-sm font-normal border-1 border-gray-300 bg-gray-100 rounded-lg'/>
                    {errors.street &&(
                      <p className='text-xs'>Please Enter CVV</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="bg-black text-white p-2 mt-[1rem] rounded-lg text-sm">
                  Pay with GPay
                </button>
              </div>
            </div>
            <div></div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Checkout