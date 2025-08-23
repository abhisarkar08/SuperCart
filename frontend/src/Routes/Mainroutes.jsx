import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy } from "react";
const Orders = lazy(() => import("../pages/admin/Orders"))
const SingleCard = lazy(() => import("../components/SingleCard"));
const Checkout = lazy(() => import("../components/Checkout"));
const Products = lazy(() => import("../pages/users/Products"));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import('../pages/admin/Profile'));
const Cart = lazy(() => import('../pages/admin/Cart'));
const Pagenotfound = lazy(() => import('../Pagenotfound'));
const Wishlist = lazy(() => import('../pages/admin/Wishlist'));

const Mainroutes = () => {
  const user = useSelector(state => state.userReducer?.data);
  const location = useLocation();


  const publicPaths = ["/", "/login"];
  const isPublicPath = publicPaths.includes(location.pathname);

  if (!user && !publicPaths.includes(location.pathname)) {
  return <Navigate to="/login" replace />;
}

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <Register />} />
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />

      {user && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/singleCard/:id" element={<SingleCard />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/products" element={<Products />} />
        </>
      )}

      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
};

export default Mainroutes;


