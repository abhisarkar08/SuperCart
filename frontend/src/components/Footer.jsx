import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/"
    if (isAuthPage) {
        return null;
    }
  return (
    <div className='w-full  bg-gray-900 text-gray-300'>
        <div className='w-full px-8 py-16'> {/* Full width with more padding */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
                {/* Company Info Section */}
                <div className='space-y-6'>
                    <h1 className='text-white text-[clamp(1rem,3vw,1.4rem)] font-semibold'>SuperCart</h1>
                    <p className='text-[clamp(0.9rem,3vw,1.1rem)] text-gray-400 leading-8'>
                        SuperCart brings you a curated collection of quality essentials — delivered with unmatched service, speed, and style.
                    </p>
                    <div className='flex space-x-4 pt-3'>
                        <div className='w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors'>
                            <FaFacebookF className='text-base'/>
                        </div>
                        <div className='w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center hover:bg-blue-400 cursor-pointer transition-colors'>
                            <FaTwitter className='text-base'/>
                        </div>
                        <div className='w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center hover:bg-pink-1000 cursor-pointer transition-colors'>
                            <FaInstagram className='text-base'/>
                        </div>
                        <div className='w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors'>
                            <FaYoutube className='text-base'/>
                        </div>
                    </div>
                </div>

                {/* Popular Categories */}
                <div>
                    <h2 className='text-white text-xl font-semibold mb-8'>Popular Categories</h2>
                    <div className='space-y-4'>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Electronics</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Home & Kitchen</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Fashion</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Groceries</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Beauty</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Sports</p>
                    </div>
                </div>

                {/* Customer Service */}
                <div>
                    <h2 className='text-white text-xl font-semibold mb-8'>Customer Service</h2>
                    <div className='space-y-4'>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Contact Us</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Shipping Info</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Returns & Exchanges</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>FAQ</p>
                        <p className='text-gray-400 hover:text-white cursor-pointer transition-colors text-base'>Size Guide</p>
                    </div>
                </div>

                {/* Get in Touch */}
                <div>
                    <h2 className='text-white text-xl font-semibold mb-8'>Get in Touch</h2>
                    <div className='space-y-5'>
                        <div className='flex items-center space-x-4'>
                            <div className='w-6 h-6 flex items-center justify-center'>
                                <FaPhone className='text-gray-400 text-sm'/>
                            </div>
                            <p className='text-gray-400 text-base hover:text-white cursor-pointer transition-colors'>1-800-SHOP-NOW</p>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <div className='w-6 h-6 flex items-center justify-center'>
                                <FaEnvelope className='text-gray-400 text-sm'/>
                            </div>
                            <p className='text-gray-400 text-base hover:text-white cursor-pointer transition-colors'>support@supercart.com</p>
                        </div>
                        <div className='flex items-start space-x-4'>
                            <div className='w-6 h-6 flex items-center justify-center mt-1'>
                                <FaMapMarkerAlt className='text-gray-400 text-sm'/>
                            </div>
                            <p className='text-gray-400 text-base hover:text-white cursor-pointer transition-colors'>123 Commerce St, City, State 12345</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className='border-t border-gray-800 mt-16 pt-10'>
                <div className='text-center'>
                    <p className='opacity-90 text-base'>© 2025 SuperCart. All rights reserved. | Built with ❤️ by Abhishek Sarkar</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer;

