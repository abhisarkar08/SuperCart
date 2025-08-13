import axios from '../../api/Axioscon';
import { loadProduct } from "../Reducers/ProductSlice";

export const asyncloadpro = () => async(dispatch,getState) =>{
    try {
        const {data} = await axios.get('/products')
         console.log("Fetched from backend:", data);
        dispatch(loadProduct(data))
  } catch (error) {
    console.log(error);
  }
};

export const asynccreatepro = (product) => async (dispatch, getState) => {
  try {
    await axios.get('/products', product)
    dispatch(asyncloadpro())
  } catch (error) {
    console.log(error);
  }
};