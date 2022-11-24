import { deleteAllProductCart } from "./actionCart.js";

//VARIABLES TO DEFINE THE FUNCTIONALITIES OF THE BUTTONS

const modalBtn = document.getElementById("modalBtn");
const finalBuyBtn = document.getElementById("finalBuyBtn");
const exitBtn = document.getElementById("exitBtn");
const emptyCart = document.querySelector(".emptyCart");

modalBtn.addEventListener("click", () => {
    const asideChange = document.querySelector(".asideNone");
    asideChange.classList.toggle("aside");
    const bodyBg = document.querySelector(".bodyStyle");
    bodyBg.classList.add("bodyBg");
})

exitBtn.addEventListener("click", () => {
    const asideChange = document.querySelector(".asideNone");
    asideChange.classList.toggle("aside");
})

emptyCart.addEventListener("click", () =>{
    Swal.fire({
        title: 'Do you want to empty the cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#121214',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, empty the cart'
      }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title:'The cart is empty',
            icon: "success",
            confirmButtonColor: '#121214',
            })
            deleteAllProductCart();
        }
    })
})

finalBuyBtn.addEventListener("click", () => {
    const asideChange = document.querySelector(".asideNone");
    asideChange.classList.toggle("aside");
    Swal.fire({
        title: 'Confirm the purchase?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#121214',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm the purchase'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                timer: 2000,
                timerProgressBar: true,
                icon: "success",
                title: "Order confirmed.",
                text: "Thanks you for your purchase!",
                showConfirmButton: false,
                timer: 2500,
            })
            deleteAllProductCart();
        }
    })
})
