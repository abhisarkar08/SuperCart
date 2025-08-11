import axios from '../../api/Axioscon';
import { loadUser } from '../Reducers/UserSlice';

export const asynccurrentuser = () => async (dispatch, getState) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      if(user) dispatch(loadUser(user))
      else console.log("User not logged in !!")
    } catch (error) {
      console.log(error);
    }
  };

export const asynclogoutuser = () => async (dispatch, getState) => {
    try {
      localStorage.setItem("user", "")
    } catch (error) {
      console.log(error);
    }
  };

export const asyncgetuser = () => async (dispatch, getState) => {
  try {
    const {res} = await axios.get(
        `/users?email=${user.email}&password=${user.password}`
    );
    console.log(data[0]);
    localStorage.setItem("user", JSON.stringify(data[0]))
  } catch (error) {
    console.log(error);
  }
};


export const asyncpostuser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    dispatch(loadUser(res.data)); // agar sirf ek user return ho to
    // agar list update chahiye to yaha dispatch(asyncgetuser()) bhi kar sakte ho
  } catch (error) {
    console.log(error);
  }
};

