
import api from "../../api/Axioscon";

export const addToCartBackend = async (product, userId, qty = 1) => {
  try {
    const res = await api.get("/cart", { params: { userId, productId: product.id } });
    const existingItems = res.data;

    if (existingItems.length > 0) {
      const existingItem = existingItems[0];
      await api.patch(`/cart/${existingItem.id}`, { qty: existingItem.qty + qty });
    } else {
      const cartItem = {
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        qty
      };
      await api.post("/cart", cartItem);
    }

    console.log("Cart updated successfully!");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const fetchUserCart = async (userId) => {
  try {
    const res = await api.get("/cart", { params: { userId } });
    return res.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};
