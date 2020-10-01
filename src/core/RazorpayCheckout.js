import React, {  useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty} from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { KEY_ID, API } from "../backend";
import LOGO from "./LOGO.png";

const RazorpayCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated()._id;
  const email = isAuthenticated() && isAuthenticated().email;
  const name = isAuthenticated() && isAuthenticated().name;

  const totalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount += p.count * p.item.price;
    });
    return amount;
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check you network connection."
      );
      return;
    }

    const paymentInfo = {
      amount: totalAmount(),
    };

    const data = await fetch(`${API}/payments/order/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(paymentInfo),
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: KEY_ID,
      amount: data.amount.toString(),
      currency: "INR",
      name: "Apni Dukan",
      description: "Cart payment",
      image: LOGO,
      order_id: data.id,
      handler: function (response) {
        // console.log(response);
        cartEmpty();
        setReload(!reload);
      },
      prefill: {
        name: name,
        email: email,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const showRazorpayButton = () => {
    return isAuthenticated() ? (
      <Button onClick={displayRazorpay} variant="success">
        Pay with Razorpay
      </Button>
    ) : (
      <Link to="/signin">
        <Button variant="danger">Sign in to Pay</Button>
      </Link>
    );
  };

  return (
    <div className="p-1 ">
      <h3 className="">
        Checkout loaded <br /> Total Amount: ₹{totalAmount()}{" "}
      </h3>
      {showRazorpayButton()}
    </div>
  );
};

export default RazorpayCheckout;
