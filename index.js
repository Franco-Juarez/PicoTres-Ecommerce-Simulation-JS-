import { addCards } from "./app.js"
import { recoverShoppingCart } from "./src/actionCart.js";
import { getShoppingCart } from "./src/storage.js";
import { updateTotalCart } from "./src/updateCart.js";
import { getProduct } from "./src/getProduct.js";

//FUNCTION TO RENDER THE PRODUCTS AND RECOVER DATA FROM THE LOCAL STORAGE ONCE THE PAGE IS REFRESHED.

document.addEventListener("DOMContentLoaded", async () => {
    const productCollection = await getProduct();

    addCards(productCollection);

    if (localStorage.getItem('shoppingCart')) {
        const shoppingCartIndex = getShoppingCart();
        recoverShoppingCart(shoppingCartIndex);
        updateTotalCart(shoppingCartIndex);
    }
})