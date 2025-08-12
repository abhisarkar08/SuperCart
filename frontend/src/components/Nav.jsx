import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asynccurrentuser } from '../Store/Actions/UserAction';
import { asynclogoutuser } from '../Store/Actions/UserAction';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const user = useSelector(state => state.userReducer?.data);
  const dispatch = useDispatch();

  // Check if current page is login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/";

  useEffect(() => {
    dispatch(asynccurrentuser());
  }, [dispatch]);

  return (
    <nav className="bg-white text-black border-b border-gray-200 ">

      {/* ---------- MOBILE NAVBAR ---------- */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        {/* Logo */}
        <NavLink to="/home" className="text-[1.5rem] font-semibold tracking-tight">SuperCart</NavLink>

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
                <FaUser className="text-xl text-gray-500" />
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
                    to="/wishlist"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition text-gray-800"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <span role="img" aria-label="wishlist">❤️</span> Wishlist
                  </NavLink>
                  {user ? (
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        dispatch(asynclogoutuser()); // Redux logout action call
                        navigate("/login"); // 👈 logout ke baad login page pe bhej do
                      }}
                      className="flex gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 transition-colors text-left w-full font-semibold border-t mt-2"
                    >
                      <span>↲</span> Logout
                    </button>
                  ) : null}
                </div>
              )}
            </div>

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
          to="/home"
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
                <FaShoppingCart className="text-xl text-gray-500 xl:text-2xl" />
              </NavLink>
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center justify-center rounded-full bg-gray-100 w-10 h-10 hover:bg-gray-200 xl:w-14 xl:h-14 xl:p-4 transition-all duration-200 ease-in-out"
                >
                  <FaUser className="text-xl text-gray-500 xl:text-2xl" />
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
                        onClick={() => {
                          setShowProfileDropdown(false);
                          dispatch(asynclogoutuser()); // Redux logout action call
                          navigate("/login"); // 👈 logout ke baad login page pe bhej do
                        }}
                        className="flex gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 transition-colors text-left w-full font-semibold border-t mt-2"
                      >
                        <span>↲</span> Logout
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
