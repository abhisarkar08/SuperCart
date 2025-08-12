import { useEffect } from 'react';
import { asyncgetuser} from "./Store/Actions/UserAction";
import { useDispatch, useSelector } from 'react-redux';
import Mainroutes from './routes/Mainroutes';
import Nav from './components/Nav';
import Footer from './components/Footer'
const App = () => {
  const data = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  useEffect(() =>{
    const storeuser = JSON.parse(localStorage.getItem("user"))
    if(storeuser){
      dispatch(asyncgetuser(storeuser));
    }
  }, [dispatch]);
  return (
    <div className='text-white font-thin w-100% overflow-x-hidden min-h-screen bg-white flex flex-col'>
      <Nav/>
      <div className="flex-1 overflow-y-auto px-4 min-h-full">
        <Mainroutes />
      </div>
      <Footer/>
    </div>
  )
}

export default App
