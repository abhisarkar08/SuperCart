import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asynccurrentuser } from '../Store/Actions/UserAction';
import { asynclogoutuser, asyncupdateuser } from '../Store/Actions/UserAction';
import { FiLogOut } from "react-icons/fi";
// Electronics
import { FiMonitor } from "react-icons/fi";   // computer monitor

// Fashion
import { FiShoppingBag } from "react-icons/fi"; // shopping bag

// Grocery
import { FiShoppingCart } from "react-icons/fi"; // cart for grocery

// Sports
import { FiActivity } from "react-icons/fi"; // activity/fitness outline

// Home Appliance
import { FiTv } from "react-icons/fi"; // TV (home appliance)

// Beauty
import { FiFeather } from "react-icons/fi"; // feather (beauty/softness)

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const user = useSelector(state => state.userReducer?.data);
  const dispatch = useDispatch();

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition-colors duration-300 
    ${isActive ? 'text-blue-700' : 'text-black hover:text-blue-500'}
    after:content-[''] after:absolute after:left-1/2 after:bottom-0 
    after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 
    after:-translate-x-1/2 hover:after:w-full ${isActive ? 'after:w-full' : ''}`;


  // Check if current page is login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/";

  useEffect(() => {
    dispatch(asynccurrentuser());
  }, [dispatch]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-lg">

      {/* ---------- MOBILE NAVBAR ---------- */}
      <div className="flex items-center justify-between px-4 py-3 text-black lg:hidden">
        {/* Logo */}
        <NavLink to="/home" className="text-[1.5rem] font-semibold tracking-tight text-black">SuperCart</NavLink>

        {!isAuthPage && (
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <div className="hidden sm:flex items-center gap-2 w-full bg-gray-100 border border-gray-400 rounded-xl px-3 py-1">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none flex-1 text-md"
              />
            </div>

            {/* ---------- MOBILE BUTTON ---------- */}
            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition sm:hidden"
              >
                <FaSearch className="text-xl text-gray-600" />
              </button>
            )}

            {/* Cart */}
            <NavLink to="/cart" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <FaShoppingCart className="text-xl text-gray-600" />
            </NavLink>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              {/* Profile Icon Button */}
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center justify-center rounded-full bg-gray-100 w-10 h-10 hover:bg-gray-200 transition"
              >
                <FaUser className="cursor-pointer text-xl text-gray-500" />
              </button>
              {/* Dropdown menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 top-14 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <div className="font-bold text-lg mb-1">{user.username}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition text-gray-800"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <span role="img" aria-label="profile">⚙️</span> Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition text-gray-800"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <span role="img" aria-label="orders">📦</span> My Orders
                  </NavLink>
                  <NavLink
                    to="/whislist"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition text-gray-800"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <span role="img" aria-label="wishlist">❤️</span> Wishlist
                  </NavLink>
                  {user ? (
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        dispatch(asyncupdateuser(user.id, { isAdmin: false })); 
                        dispatch(asynclogoutuser()); // Redux logout action call
                        navigate("/login"); // 👈 logout ke baad login page pe bhej do
                      }}
                      className="cursor-pointer flex gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 transition-colors text-left w-full font-semibold border-t mt-2"
                    >
                      <span>↲</span> Logout
                    </button>
                  ) : null}
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-black p-2 rounded-full hover:bg-gray-100">
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Search Bar */}
      {!isAuthPage && searchOpen && (
        <div className="sm:hidden absolute top-20 left-1/2 -translate-x-1/2 w-[90%] flex items-center gap-2 bg-gray-100 border border-gray-400 rounded-xl px-3 py-1 z-50">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none flex-1 text-base"
          />
          <button onClick={() => setSearchOpen(false)} className="text-gray-500">
            ✖
          </button>
        </div>
      )}

      {/* Mobile Menu Links - Overlay */}
      {!isAuthPage && menuOpen && (
        <div className="text-black absolute top-20 left-1/2 w-[90%] -translate-x-1/2 rounded-xl bg-white shadow-md px-6 py-4 z-50 lg:hidden">
          <div className="flex flex-col gap-3 font-semibold">
            <NavLink to="/products/electronics" className={`${navLinkClass} flex items-center gap-2`}>
              <FiMonitor /> <span>Electronics</span>
            </NavLink>

            <NavLink to="/products/fashion" className={`${navLinkClass} flex items-center gap-2`}>
              <FiShoppingBag /> <span>Fashion</span>
            </NavLink>

            <NavLink to="/products/groceries" className={`${navLinkClass} flex items-center gap-2`}>
              <FiShoppingCart /> <span>Groceries</span>
            </NavLink>

            <NavLink to="/products/homeappli" className={`${navLinkClass} flex items-center gap-2`}>
              <FiTv /> <span>Home & Appliances</span>
            </NavLink>

            <NavLink to="/products/beauty" className={`${navLinkClass} flex items-center gap-2`}>
              <FiFeather /> <span>Beauty</span>
            </NavLink>

            <NavLink to="/products/sports" className={`${navLinkClass} flex items-center gap-2`}>
              <FiActivity /> <span>Sports</span>
            </NavLink>
          </div>

        </div>
      )}

      {/* ---------- DESKTOP NAVBAR ---------- */}
      <div className={`hidden lg:flex items-center py-2 px-4 justify-between  text-black mx-auto ${isAuthPage ? "px-6 py-2" : "max-w-[1320px]"}`}>
        {/* Logo hamesha dikhana */}
        <NavLink
          to="/home"
          className="text-[1.2rem] font-bold tracking-tight xl:text-[1.5rem] transition-all duration-200 ease-in-out"
        >
          SuperCart
        </NavLink>

        {/* Agar auth page nahi hai tabhi ye sab dikhao */}
        {!isAuthPage && (
          <>
            <div className="flex gap-5 text-sm font-medium text-black  transition-all duration-200 ease-in-out ">
              <NavLink to="/products/electronics" className={navLinkClass}>Electronics</NavLink>
              <NavLink to="/products/fashion" className={navLinkClass}>Fashion</NavLink>
              <NavLink to="/products/groceries" className={navLinkClass}>Groceries</NavLink>
              <NavLink to="/products/homeappli" className={navLinkClass}>Home & Appliances</NavLink>
              <NavLink to="/products/beauty" className={navLinkClass}>Beauty</NavLink>
              <NavLink to="/products/sports" className={navLinkClass}>Sports</NavLink>
            </div>

            {/* Search Bar */}
            <div className="transition-all duration-200 ease-in-out flex items-center gap-3 bg-gray-50 border border-solid border-gray-300 rounded-xl px-4 py-0.5 w-[35%] focus-within:shadow-lg focus-within:ring-3 focus-within:ring-gray-300">
              <FaSearch className='text-gray-500' />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-base font-normal p-1"
              />
            </div>

            {/* Right Side */}
            <div className="flex gap-4">
              <NavLink to="/cart" className="transition-all duration-200 ease-in-out flex items-center justify-center rounded-full bg-gray-100 w-12 h-12 hover:bg-gray-200">
                <FaShoppingCart className="text-xl text-gray-500 " />
              </NavLink>
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center justify-center rounded-full bg-gray-100 w-12 h-12 hover:bg-gray-200 transition-all duration-200 ease-in-out"
                >
                  <FaUser className="cursor-pointer text-xl text-gray-500" />
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 top-14 w-64 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b">
                      {user ? (
                        <>
                          <div className="font-bold text-lg mb-0.5">{user.username}</div>
                          <div className="text-md text-gray-600">{user.email}</div>
                        </>
                      ) : (
                        <div className="text-center text-sm text-gray-600">Not logged in</div>
                      )}
                    </div>
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <span role="img" aria-label="profile">⚙️</span> Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <span role="img" aria-label="orders">📦</span> My Orders
                    </NavLink>
                    <NavLink
                      to="/wishlist"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <span role="img" aria-label="wishlist">❤️</span> Wishlist
                    </NavLink>
                    {user ? (
                      <button
                        onClick={async () => { // 👈 async banaya
                          setShowProfileDropdown(false);

                          try {
                            // 1. Backend update
                            dispatch(asyncupdateuser(user.id, { isAdmin: false })); 

                            // 2. Logout
                            dispatch(asynclogoutuser());

                            // 3. Navigate
                            navigate("/login");
                          } catch (err) {
                            console.error("Logout failed:", err);
                          }
                        }}
                        className="cursor-pointer flex gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 transition-colors text-left w-full font-semibold border-t mt-2"
                      >
                        <span><FiLogOut/></span> Logout
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
