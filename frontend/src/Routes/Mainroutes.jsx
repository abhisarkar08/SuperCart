import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from '../pages/Home'
import Products from '../pages/Products'
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from '../pages/admin/Profile'
import Cart from '../pages/admin/Cart'
import Pagenotfound from '../Pagenotfound'
import Wishlist from '../pages/admin/Wishlist'
import Orders from '../pages/admin/Orders'
import Electronics from "../pages/users/Electronics";
import Fashion from "../pages/users/Fashion"
import Groceries from "../pages/users/Groceries"
import Sports from "../pages/users/Sports"
import Beauty from "../pages/users/Beauty"
import Homeappli from "../pages/users/Homeappli"
import SingleCard from "../components/SingleCard";

const Mainroutes = () => {
  const user = useSelector(state => state.userReducer?.data);

  return (
    <Routes>
      {/* Agar user nahi hai toh Register dikhao */}
      <Route path="/" element={user ? <Navigate to="/home" /> : <Register />} />

      {/* Agar user nahi hai toh login dikhao */}
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />

      {/* Ye pages tab dikhao jab user login ho */}
      {user && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/electronics" element={<Electronics/>}/>
          <Route path="/beauty" element={<Beauty/>}/>
          <Route path="/fashion" element={<Fashion/>}/>
          <Route path="/groceries" element={<Groceries/>}/>
          <Route path="/sports" element={<Sports/>}/>
          <Route path="/homeappli" element={<Homeappli/>}/>
          <Route path="/singleCard/:id" element={<SingleCard/>}/>
        </>
      )}

      {/* Agar koi unknown route pe gaya toh redirect kar do */}
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
};

export default Mainroutes;
