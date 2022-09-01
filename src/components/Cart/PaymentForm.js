import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

import { useSelector } from "react-redux";

import styles from "./PaymentForm.module.css";

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.user);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const name = `${user?.firstName} ${user?.lastName}`;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successful");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={paymentHandler} className={styles["form-container"]}>
        <h2>Credit Card Payment:</h2>
        <div className={styles.card}>
          <CardElement />
        </div>
        {isProcessingPayment ? (
          <button disabled className="ui loading button">
            Processing
          </button>
        ) : (
          <button className="positive ui button">Pay now</button>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
