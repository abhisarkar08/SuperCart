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

export const asyncgetuser = (user) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );

    if (res.data.length === 0) {
      return null; // <-- not found
    }

    const foundUser = res.data[0];

    // LocalStorage me save karo
    localStorage.setItem("user", JSON.stringify(foundUser));

    // Redux store me load karo
    dispatch(loadUser(foundUser));

    return foundUser; // <-- object return
  } catch (error) {
    console.log(error);
    return null;
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

export const asyncupdateuser = (id, updatedData) => async (dispatch) => {
  try {
    const res = await axios.patch(`/users/${id}`, updatedData);

    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const mergedUser = { ...currentUser, ...updatedData };

    localStorage.setItem("user", JSON.stringify(mergedUser));
    dispatch(loadUser(mergedUser));
  } catch (error) {
    console.log(error);
  }
};


