import { useEffect } from 'react';
import axios from './api/Axioscon'
const App = () => {
  const getpro = async () =>{
    try{
      const res = await axios.get("/products");
      console.log(res);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() =>{
    getpro();
  }, []);
  return (
    <div>App</div>
  )
}

export default App
