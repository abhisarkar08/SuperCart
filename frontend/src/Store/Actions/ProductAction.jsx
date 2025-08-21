import axios from '../../api/Axioscon';
import { loadProduct, setLoading } from "../Reducers/ProductSlice";

export const asyncloadpro = (category) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const startTime = Date.now();
    const { data } = await axios.get('/products');
    const elapsed = Date.now() - startTime;
    const minDelay = 1000; // 1 second minimum

    if (elapsed < minDelay) {
      await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
    }

    dispatch(loadProduct(data));
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
  }
};

