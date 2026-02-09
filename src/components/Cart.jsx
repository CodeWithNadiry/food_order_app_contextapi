import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
import useCartTotalAmount from "../util/totalAmount";

const Cart = () => {
  const { items, removeItem, addItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const total = useCartTotalAmount()

  function handleCloseCart() {
    hideCart();
  }

  function handleShowCheckout() {
    showCheckout();
  }

  return (
    <Modal
      customClasses="cart"
      open={progress === "cart"}
      closeModal={progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onDecrease={() => removeItem(item.id)}
            onIncrease={() => addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(total)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && <Button onClick={handleShowCheckout}>Go To Checkout</Button>}
      </p>
    </Modal>
  );
};

export default Cart;
