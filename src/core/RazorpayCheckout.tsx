import React from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { KEY_ID, API } from "../backend";
import LOGO from "./logos/LOGO.png";
import { JWT } from "../interfaces/userInterfaces";
import { LocalStorageCart } from "../interfaces/coreInterfaces";

interface IProps {
  products: LocalStorageCart;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
}

const RazorpayCheckout: React.FC<IProps> = ({
  products,
  setReload = (f) => f,
  reload = false,
}) => {
  const token = isAuthenticated() && (isAuthenticated() as JWT).token;
  const userId = isAuthenticated() && (isAuthenticated() as JWT)._id;
  const email = isAuthenticated() && (isAuthenticated() as JWT).email;
  const name = isAuthenticated() && (isAuthenticated() as JWT).name;

  const totalAmount = () => {
    let amount = 0;
    products.forEach((p) => {
      amount += p.count * parseFloat(p.item.price);
    });
    return amount;
  };

  // console.log(totalAmount());

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

    // console.log(data);

    const options = {
      key: KEY_ID,
      amount: data.amount.toString(),
      currency: "INR",
      name: "Apni Dukan",
      description: "Cart payment",
      image: LOGO,
      order_id: data.id,
      handler: function (_: any) {
        cartEmpty();
        setReload(!reload);
      },
      prefill: {
        name: name,
        email: email,
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const loadRazorpay = (src: any) => {
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
