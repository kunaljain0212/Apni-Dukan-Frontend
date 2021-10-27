const { API } = require("../../backend");

//FIXME: This function is not being called anywhere at the moment and also orderData has been given any type which should not be case. So implememnt this in some near future
export const createOrder = (userId: string, token: string, orderData: any) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err)
    });
};
