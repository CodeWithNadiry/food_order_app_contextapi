import { useContext } from "react";
import CartContext from "../store/CartContext";

function useCartTotalAmount() {
  const { items } = useContext(CartContext);

  const totalAmount = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  return totalAmount;
}

export default useCartTotalAmount;
