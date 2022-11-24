import { productValidation } from "./src/actionCart.js";
import { getProduct } from "./src/getProduct.js";

const productContainer = document.getElementById("productContainer");
let productos = [];

getProduct().then(array => array.forEach(e => productos.push(e)));

//FUNCTION TO RENDER PRODUCTS IN THE DOM FROM AN ARRAY OF OBJECTS
const addCards = (array) => {
    array.forEach(product => {
        const article = document.createElement('article');
        article.innerHTML += `
                            <div class="card">
                                <img src=${product.img} class="card-img-top" alt=${product.alt} >
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p>$${product.price}</p>
                                        <p class="card-text">${product.desc}</p>
                                        <button class="btn" id=btn${product.idProduct}>Add to Cart</button>
                                    </div>
                            </div>
                            `
        productContainer.appendChild(article);

        const btnBuy = document.getElementById(`btn${product.idProduct}`);

        btnBuy.addEventListener('click', () => {
            productValidation(product.idProduct);
            Toastify({
                text: `${product.name} was added to the shopping cart`,
                duration: 1500,
                style: {
                    background: "#121214",
                    borderRadius: "0.375rem",
                },
            }).showToast();
        })
    });
}

//ARRAY FILTERS

const drumFilter = document.querySelector(".drum");
drumFilter.addEventListener("click", () => {
    productContainer.innerHTML = '';
    const drum = productos.filter(product => product.type == "drumKit");
    addCards(drum);
})

const melodyFilter = document.querySelector(".melody");
melodyFilter.addEventListener("click", () => {
    productContainer.innerHTML = '';
    const melody = productos.filter(product => product.type == "melody");
    addCards(melody);
})

const midiFilter = document.querySelector(".midi");
midiFilter.addEventListener("click", () => {
    productContainer.innerHTML = '';
    const midi = productos.filter(product => product.type == "midi");
    addCards(midi);
})

const priceFilter = document.querySelector(".bestPrice");
priceFilter.addEventListener("click", () => {
    productContainer.innerHTML = '';
    const bestPrice = productos.filter(product => product.price <= 1200);
    addCards(bestPrice);
})


const deleteFilter = document.getElementById("deleteFilter");
deleteFilter.addEventListener("click", () => {
    productContainer.innerHTML = '';
    addCards(productos);
})

export { addCards };