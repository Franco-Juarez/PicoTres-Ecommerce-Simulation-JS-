import { getProduct } from "./getProduct.js";
import { getShoppingCart } from "./storage.js";
import { updateTotalCart } from "./updateCart.js";

let shoppingCart = [];


//VALIDATION TO DEFINE IF A PRODUCT IS REPEATED IN THE SHOPPING-CART ARRAY
const productValidation = (idProduct) => {
    localStorage.getItem('shoppingCart') && (shoppingCart = getShoppingCart());

    const repeatedProduct = shoppingCart.find(product => product.idProduct == idProduct);

    if (repeatedProduct) {
        repeatedProduct.amount++;
        const productAmount = document.getElementById(`productAmount${repeatedProduct.idProduct}`);
        productAmount.innerText = `Amount: ${repeatedProduct.amount}`;   
        productAmount.value = repeatedProduct.amount;
        updateTotalCart(shoppingCart);
    } else {
        addProductToCart(idProduct);
    }
}

//FUNCTION TO PUSH A NEW OBJECT TO THE ARRAY AND ADD AN ELEMENT WITH THE DATA OF IT
const addProductToCart = async (idProduct) => {
    const container = document.getElementById('cartListContainer');
    const productCollection = await getProduct();
    const product = productCollection.find(product => product.idProduct == idProduct);
    product.amount++;
    shoppingCart.push(product);
    
    const div = document.createElement("div");
    div.classList.add("productPriceDetail");

    div.innerHTML = `
                    <div class="imgDetailDiv">
                        <img src=${product.img}>
                    </div>
                    <div class="productDiv">
                        <div class="productNamePrice">
                            <p>${product.name}</p>
                            <p id="productAmount${product.idProduct}">Amount: ${product.amount}</p> 
                            <p>$${product.price}</p>
                        </div>
                        <div class="deleteBtnEfx">
                            <button class="deleteBtnProduct" value=${product.idProduct}>Delete</button>
                        </div>
                    </div>
                    `;
    container.appendChild(div);
    updateTotalCart(shoppingCart);
    addDeleteAction();
}

//FUNCTION TO RETRIEVE INFORMATION FROM STORAGE.JS AND AVOID DATA LOSS WHEN REFRESHING THE PAGE.
const recoverShoppingCart = (shoppingCart) => {
    const container = document.getElementById('cartListContainer');

    container.innerHTML = "";

    shoppingCart.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("productPriceDetail");
        div.innerHTML = `
                        <div class="imgDetailDiv">
                            <img src=${product.img}>
                        </div>
                        <div class="productDiv">
                            <div class="productNamePrice">
                                <p>${product.name}</p>
                                <p id="productAmount${product.idProduct}">Amount: ${product.amount}</p>
                                <p>$${product.price}</p>
                            </div>
                            <div class="deleteBtnEfx">
                                <button class="deleteBtnProduct" value=${product.idProduct}>Delete</button>
                            </div>
                        </div>
                        `;
        container.appendChild(div);
    });
    addDeleteAction();
};

//FUNCTION TO DELETE THE PRODUCTS USING THE ID OF EACH ONE. I RETURN THIS FUNCTION IN THE FUNCTIONALITIES OF THE DELETE PRODUCT BUTTON

const deleteProductCart = (idProduct) => {
    const storageCart = getShoppingCart();
    const updateStorageCart = storageCart.filter( item => item.idProduct != idProduct);

    updateTotalCart(updateStorageCart);
    recoverShoppingCart(updateStorageCart);
}

const deleteAllProductCart = () => {
    updateTotalCart([]);
    recoverShoppingCart([]);
}

//FUNCTION TO ADD THE FUNCTIONALITY OF DELETING ITEMS IN THE CART

function addDeleteAction () {
    const arrayDeleteBtn = document.querySelectorAll(".deleteBtnProduct");
    arrayDeleteBtn.forEach(item => item.addEventListener("click", () => {
        Swal.fire({
            icon: "warning",
            title: "You want to delete this product?",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#121214',
            cancelButtonColor: '#d33'
        }).then((res) => {
            if (res.isConfirmed) {
                 Swal.fire (
                    "Deleted",
                    "The product has been deleted.", 
                    "success",  
                ) 
                deleteProductCart(item.value);
            }
        })
    }))
}

export {productValidation, addProductToCart, recoverShoppingCart, deleteProductCart, deleteAllProductCart };