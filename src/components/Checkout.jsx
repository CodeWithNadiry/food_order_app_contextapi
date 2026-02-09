import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import useCartTotalAmount from "../util/totalAmount";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import ErrorPage from "./ErrorPage";
import { useActionState } from "react";
import useHttp from './hooks/useHttp'
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { items, clearCart } = useContext(CartContext);
  const totalPrice = useCartTotalAmount();

  const { data, error, sendRequest, clearCartData } = useHttp(
    "http://localhost:1000/orders",
    requestConfig
  );
  function handleCloseCheckout() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearCartData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending Order Data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} closeModal={handleCloseCheckout}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={progress === "checkout"} closeModal={handleCloseCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>

        <Input label={"Full Name"} type="text" id={"name"} />
        <Input label={"E-Mail Address"} type="email" id={"email"} />
        <Input label={"street"} type="text" id={"street"} />

        <div className="control-row">
          <Input label={"Postal Code"} type="text" id={"postal-code"} />
          <Input label={"City"} type="text" id={"city"} />
        </div>

        {error && (
          <ErrorPage title={"Failed to submit order"} message={error} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
