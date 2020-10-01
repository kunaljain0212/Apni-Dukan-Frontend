import { API } from "../../backend";

export const processPayment = (userId, token, paymentInfo) => {
  fetch(`${API}/payments/order/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((res) => {
        // console.log(res.json())
        return res.json()
    })
    .catch((error) => console.log(error));
};
