const saveShoppingCart = (shoppingCart) => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
};

const getShoppingCart = () => {
    const storageCart = JSON.parse(localStorage.getItem("shoppingCart"));
    return storageCart;
};

export { saveShoppingCart, getShoppingCart };