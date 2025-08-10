import axios from '../api/Axioscon'
import {loaduser} from './UserSlice'

export const asyncgetuser = () => async (dispatch) =>{
    try{
        const res = await axios.get("/users")
        console.log(res);  
        dispatch(loaduser(res.data));
    }
    catch(error){
        console.log(error);    
    }
}
