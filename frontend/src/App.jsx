import { useEffect } from 'react';
import { asyncgetuser } from "./Store/Actions/UserAction";
import { useDispatch, useSelector } from 'react-redux';
import Mainroutes from './Routes/Mainroutes';
import Nav from './components/Nav';
import Footer from './components/Footer'
import { asyncloadpro } from './Store/Actions/ProductAction';
const App = () => {
  const data = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();
  const isHosted = window.location.hostname !== "localhost";

  useEffect(() => {
    const storeuser = JSON.parse(localStorage.getItem("user"))
    if (storeuser) {
      dispatch(asyncgetuser(storeuser));
    }
  }, [dispatch]);
  useEffect(() => {
    if (isHosted) {
      // Hosted → localStorage fallback
      if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(defaultProducts));
      }
      const storedProducts = JSON.parse(localStorage.getItem("products"));
      dispatch({ type: "SET_PRODUCTS", payload: storedProducts });
    } else {
      // Localhost → normal API call
      dispatch(asyncloadpro());
    }
  }, [dispatch]);


  const { loading } = useSelector((state) => state.productReducer);

  return (
    <div className='text-white font-thin w-100% overflow-x-hidden min-h-screen bg-white flex flex-col'>
      <Nav />
      <div className="flex-1 pt-[70px] px-[18px]">
        <Mainroutes />
      </div>
      {!loading && <Footer />}
    </div>
  )
}

export default App
