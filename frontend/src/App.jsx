import { useEffect } from 'react';
import { asyncgetuser} from "./Store/UserAction";
import { useDispatch, useSelector } from 'react-redux';
import Mainroutes from './routes/Mainroutes';
import Nav from './components/Nav';
const App = () => {
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(asyncgetuser());
  }, []);
  return (
    <div className='text-white font-thin w-screen h-screen bg-gray-800'>
      <Nav/>
      <Mainroutes/>
    </div>
  )
}

export default App
