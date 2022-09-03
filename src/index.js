import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { stripePromise } from "./utils/Stripe/stripe.utils";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Elements>
  </Provider>
);
