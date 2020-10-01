export const addItemToCart = (item) => {
  // console.log(item);
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      const index = cart.findIndex((value) => value.item._id === item._id);
      // console.log(index);
      if (index !== -1) {
        cart[index].count++;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart.push({
          item,
          count: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else {
      cart.push({
        item,
        count: 1,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

export const removeItemFromCart = (item) => {
  // console.log(item);
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      const index = cart.findIndex((value) => value.item._id === item._id);
      if (cart[index].count === 1) {
        cart.splice(index, 1);
      } else {
        cart[index].count--;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const cartEmpty = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
  }
};
