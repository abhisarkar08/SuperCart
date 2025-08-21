import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asynccurrentuser,
  asynclogoutuser,
  asyncupdateuser
} from '../Store/Actions/UserAction';

import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import {
  FiLogOut,
  FiMonitor,
  FiShoppingBag,
  FiShoppingCart,
  FiActivity,
  FiTv,
  FiFeather
} from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { category } = useParams();

  // ­­­­­­­­­­­­­­­­­­­ STATE ­­­­­­­­­­­­­­­­­­
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const user = useSelector((state) => state.userReducer?.data);
  const profileRef = useRef(null);

  // ­­­­­­­­­­­­­­­­­­­ HELPERS ­­­­­­­­­­­­­­­­­­
  const closeMobileMenu = () => setMenuOpen(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      const encoded = encodeURIComponent(query.trim());
      if (category) {
        navigate(`/products/${category}?search=${encoded}`);
      } else {
        navigate(`/products?search=${encoded}`);
      }
      setSearchOpen(false);        // mobile search bar close
      closeMobileMenu();           // safety: close menu as well
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition-colors duration-300
     ${isActive ? 'text-blue-700' : 'text-black hover:text-blue-500'}
     after:content-[''] after:absolute after:left-1/2 after:bottom-0
     after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300
     after:-translate-x-1/2 hover:after:w-full ${isActive ? 'after:w-full' : ''}`;

  const isAuthPage = location.pathname === '/login' || location.pathname === '/';

  // ­­­­­­­­­­­­­­­­­­­ EFFECTS ­­­­­­­­­­­­­­­­­­
  useEffect(() => {
    dispatch(asynccurrentuser());
  }, [dispatch]);

  // close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // close profile dropdown & mobile panels on route change
  useEffect(() => {
    setShowProfileDropdown(false);
    closeMobileMenu();
    setSearchOpen(false);
  }, [location]);

  // ­­­­­­­­­­­­­­­­­­­ RENDER ­­­­­­­­­­­­­­­­­­
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-md">
      {/* ────────── MOBILE NAVBAR ────────── */}
      <div className="flex items-center justify-between px-4 py-3 text-black lg:hidden">
        {/* logo */}
        <NavLink to="/home" className="text-[1.5rem] font-semibold tracking-tight text-black">
          SuperCart
        </NavLink>

        {!isAuthPage && (
          <div className="flex items-center text-black gap-2">
            {/* inline search (≥ sm) */}
            <div className="hidden sm:flex items-center gap-2 w-full bg-gray-100 border border-gray-400 rounded-xl px-3 py-1">
              <FaSearch className="text-gray-500 cursor-pointer" onClick={() => handleSearch({ key: 'Enter' })} />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-transparent outline-none flex-1 text-md text-black placeholder-gray-500"
              />
            </div>

            {/* search toggle (mobile) */}
            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition sm:hidden"
              >
                <FaSearch className="text-xl text-gray-600" />
              </button>
            )}

            {/* cart */}
            <NavLink to="/cart" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <FaShoppingCart className="text-xl text-gray-600" />
            </NavLink>

            {/* profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center justify-center rounded-full bg-gray-100 w-10 h-10 hover:bg-gray-200 transition"
              >
                <FaUser className="text-xl text-gray-500" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 top-14 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    {user ? (
                      <>
                        <div className="font-bold text-lg mb-1">{user.username}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </>
                    ) : (
                      <div className="text-center text-sm text-gray-600">Not logged in</div>
                    )}
                  </div>

                  <NavLink to="/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition" onClick={() => setShowProfileDropdown(false)}>
                    ⚙️ Profile
                  </NavLink>
                  <NavLink to="/orders" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition" onClick={() => setShowProfileDropdown(false)}>
                    📦 My Orders
                  </NavLink>
                  <NavLink to="/wishlist" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition" onClick={() => setShowProfileDropdown(false)}>
                    ❤️ Wishlist
                  </NavLink>

                  {user && (
                    <button
                      onClick={async () => {
                        setShowProfileDropdown(false);
                        await dispatch(asyncupdateuser(user.id, { isAdmin: false }));
                        await dispatch(asynclogoutuser());
                        navigate('/login', { replace: true });
                      }}
                      className="cursor-pointer flex gap-2 items-center px-4 py-3 text-red-600 hover:bg-gray-100 transition-colors w-full font-semibold border-t mt-2"
                    >
                      <FiLogOut /> Logout
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full hover:bg-gray-100">
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        )}
      </div>

      {/* mobile search bar overlay */}
      {!isAuthPage && searchOpen && (
        <div className="sm:hidden absolute top-20 left-1/2 -translate-x-1/2 w-[90%] flex items-center gap-2 bg-gray-100 border border-gray-400 rounded-xl px-3 py-1 z-50">
          <FaSearch className="text-gray-500 cursor-pointer" onClick={() => handleSearch({ key: 'Enter' })} />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent outline-none flex-1 text-base text-black placeholder-gray-500"
          />
          <button onClick={() => setSearchOpen(false)} className="text-gray-500">✖</button>
        </div>
      )}

      {/* mobile menu overlay */}
      {!isAuthPage && menuOpen && (
        <div className="text-black absolute top-20 left-1/2 w-[90%] -translate-x-1/2 rounded-xl bg-white shadow-md px-6 py-4 z-50 lg:hidden">
          <div className="flex flex-col gap-3 font-semibold">
            <NavLink to="/products/electronics" className={`${navLinkClass} flex items-center gap-2`} onClick={closeMobileMenu}>
              <FiMonitor /> <span>Electronics</span>
            </NavLink>
            <NavLink to="/products/fashion" className={`${navLinkClass} flex items-center gap-2`} onClick={closeMobileMenu}>
              <FiShoppingBag /> <span>Fashion</span>
            </NavLink>
            <NavLink to="/products/groceries" className={`${navLinkClass} flex items-center gap-2`} onClick={closeMobileMenu}>
              <FiShoppingCart /> <span>Groceries</span>
            </NavLink>
            <NavLink to="/products/homeappli" className={`${navLinkClass} flex items-center gap-2`} onClick={closeMobileMenu}>
              <FiTv /> <span>Home & Appliances</span>
            </NavLink>
            <NavLink to="/products/beauty" className={`${navLinkClass} flex items-center gap-2`} onClick={closeMobileMenu}>
              <FiFeather /> <span>Beauty</span>
            </NavLink>
            <NavLink to="/products/sports" className={`${navLinkClass} flex items-center gap-2`} onClick={closeMobileMenu}>
              <FiActivity /> <span>Sports</span>
            </NavLink>
          </div>
        </div>
      )}

      {/* ────────── DESKTOP NAVBAR ────────── */}
      <div className={`hidden lg:flex items-center justify-between items-center py-2 px-4 text-black mx-auto ${isAuthPage ? 'px-6 py-2' : 'max-w-[1320px]'}`}>
        <NavLink to="/home" className="text-[1.2rem] font-bold tracking-tight xl:text-[1.5rem]">
          SuperCart
        </NavLink>

        {!isAuthPage && (
          <>
            <div className="flex gap-5 text-sm font-medium">
              <NavLink to="/products/electronics" className={navLinkClass}>Electronics</NavLink>
              <NavLink to="/products/fashion" className={navLinkClass}>Fashion</NavLink>
              <NavLink to="/products/groceries" className={navLinkClass}>Groceries</NavLink>
              <NavLink to="/products/homeappli" className={navLinkClass}>Home & Appliances</NavLink>
              <NavLink to="/products/beauty" className={navLinkClass}>Beauty</NavLink>
              <NavLink to="/products/sports" className={navLinkClass}>Sports</NavLink>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 border border-gray-300 rounded-xl px-4 py-1 font-normal text-base w-[35%]">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-transparent outline-none text-base flex-1"
              />
            </div>

            <div className="flex gap-4">
              <NavLink to="/cart" className="flex items-center justify-center rounded-full bg-gray-100 w-12 h-12 hover:bg-gray-200">
                <FaShoppingCart className="text-xl text-gray-500" />
              </NavLink>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="cursor-pointer flex items-center justify-center rounded-full bg-gray-100 w-12 h-12 hover:bg-gray-200"
                >
                  <FaUser className="text-xl text-gray-500" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 top-14 w-64 rounded-xl bg-white shadow-xl border border-gray-200 z-50">
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

                    <NavLink to="/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100" onClick={() => setShowProfileDropdown(false)}>
                      ⚙️ Profile
                    </NavLink>
                    <NavLink to="/orders" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100" onClick={() => setShowProfileDropdown(false)}>
                      📦 My Orders
                    </NavLink>
                    <NavLink to="/wishlist" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100" onClick={() => setShowProfileDropdown(false)}>
                      ❤️ Wishlist
                    </NavLink>

                    {user && (
                      <button
                        onClick={async () => {
                          setShowProfileDropdown(false);
                          await dispatch(asyncupdateuser(user.id, { isAdmin: false }));
                          await dispatch(asynclogoutuser());
                          navigate('/login', { replace: true });
                        }}
                        className="cursor-pointer flex gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 w-full font-semibold border-t mt-2"
                      >
                        <FiLogOut /> Logout
                      </button>
                    )}
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
