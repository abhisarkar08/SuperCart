
import { createSlice } from "@reduxjs/toolkit";


const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart from storage", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromStorage(), 
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); 
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); 
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems"); 
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
