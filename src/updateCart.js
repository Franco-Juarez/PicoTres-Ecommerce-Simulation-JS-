import { saveShoppingCart } from "./storage.js";

//FUNCTION TO UPDATE THE CART, THE PRICES AND THEIR CONTENT.

const updateTotalCart = (shoppingCart) => {
    const totalAmount = shoppingCart.reduce((acc, item) => acc + item.amount, 0);
    const totalPrice = shoppingCart.reduce((acc, item) => acc + (item.price * item.amount), 0);

    showTotal(totalAmount, totalPrice);
    saveShoppingCart(shoppingCart);
}

//FUNCTION TO SHOW SHOW UPDATED DATA OF QUANTITY AND TOTAL PRICE.

const showTotal = (totalAmount, totalPrice) => {
    const cartCounter = document.getElementById("totalAmount");
    const cartFinalPrice = document.getElementById("finalBuyBtn");

    cartCounter.innerText = totalAmount;
    cartFinalPrice.innerText = `BUY: $${totalPrice}`;
}

export { updateTotalCart };