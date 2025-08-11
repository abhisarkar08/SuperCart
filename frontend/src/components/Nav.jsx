import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Check if current page is login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="bg-white text-black border-b border-gray-200 ">
      
      {/* ---------- MOBILE NAVBAR ---------- */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        {/* Logo */}
        <NavLink to="/" className="text-[1.5rem] font-semibold tracking-tight">SuperCart</NavLink>

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
            <NavLink to="/profile" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <FaUser className="text-xl text-gray-600" />
            </NavLink>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full hover:bg-gray-100">
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
        <div className="absolute top-20 left-1/2 w-[90%] -translate-x-1/2 rounded-xl bg-white shadow-md px-6 py-4 z-50 lg:hidden">
          <div className="flex flex-col gap-3 font-semibold">
            <NavLink to="/electronics">Electronics</NavLink>
            <NavLink to="/fashion">Fashion</NavLink>
            <NavLink to="/groceries">Groceries</NavLink>
            <NavLink to="/home-appliances">Home & Appliances</NavLink>
            <NavLink to="/beauty">Beauty</NavLink>
            <NavLink to="/sports">Sports</NavLink>
          </div>
        </div>
      )}

      {/* ---------- DESKTOP NAVBAR ---------- */}
      <div className={`hidden lg:flex items-center py-3 justify-between bg-white text-black mx-auto ${isAuthPage ? "px-6 py-2" : "max-w-[1500px]"}`}>
  {/* Logo hamesha dikhana */}
  <NavLink
    to="/"
    className="text-[1.5rem] font-bold tracking-tight xl:text-[2.1rem] transition-all duration-200 ease-in-out"
  >
    SuperCart
  </NavLink>

  {/* Agar auth page nahi hai tabhi ye sab dikhao */}
  {!isAuthPage && (
    <>
      <div className="flex gap-6 text-sm font-medium text-black xl:text-lg transition-all duration-200 ease-in-out ">
        <NavLink to="/electronics">Electronics</NavLink>
        <NavLink to="/fashion">Fashion</NavLink>
        <NavLink to="/groceries">Groceries</NavLink>
        <NavLink to="/home-appliances">Home & Appliances</NavLink>
        <NavLink to="/beauty">Beauty</NavLink>
        <NavLink to="/sports">Sports</NavLink>
      </div>

      {/* Search Bar */}
      <div className="transition-all duration-200 ease-in-out flex items-center gap-2 bg-gray-100 border border-solid border-gray-400 rounded-xl px-4 py-0.2 w-[30%] focus-within:shadow-lg focus-within:ring-3 focus-within:ring-gray-300">
        <FaSearch className='text-gray-500' />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none text-lg p-1 xl:text-xl"
        />
      </div>

      {/* Right Side */}
      <div className="flex gap-4">
        <NavLink to="/cart" className="transition-all duration-200 ease-in-out flex items-center justify-center rounded-full bg-gray-100 w-10 h-10 hover:bg-gray-200 xl:w-14 xl:h-14 xl:p-4">
          <FaShoppingCart className="text-xl text-gray-500 xl:text-2xl"/>
        </NavLink>
        <NavLink to="/profile" className="transition-all duration-200 ease-in-out flex items-center justify-center rounded-full bg-gray-100 w-10 h-10 hover:bg-gray-200 xl:w-14 xl:h-14 xl:p-4">
          <FaUser className="text-xl text-gray-500 xl:text-2xl" />
        </NavLink>
      </div>
    </>
  )}
</div>
    </nav>
  );
};

export default Navbar;
