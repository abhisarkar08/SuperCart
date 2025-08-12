import axios from '../../api/Axioscon';
import { loadUser } from '../Reducers/UserSlice';

export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return console.log("User not logged in !!");
    const user = JSON.parse(stored);
    if(user) dispatch(loadUser(user));
  } catch (error) {
    console.log(error);
  }
};

export const asynclogoutuser = () => async (dispatch, getState) => {
    try {
      localStorage.removeItem("user");
      dispatch(loadUser(null));
    } catch (error) {
      console.log(error);
    }
  };

export const asyncgetuser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    if (res.data.length === 0) {
      return false;
    }
    localStorage.setItem("user", JSON.stringify(res.data[0]));
    dispatch(loadUser(res.data[0]));
    return true
  } catch (error) {
    console.log(error);
    return false
  }
};

export const asyncpostuser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    dispatch(loadUser(res.data));
    localStorage.setItem("user", JSON.stringify(res.data)); 
  } catch (error) {
    console.log(error);
  }
};

