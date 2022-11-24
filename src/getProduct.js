const getProduct = async () => {
    try {
        const response = await fetch ("./src/dataBase.json");
        const data = await response.json();
        return data;
    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Something went wrong",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 3500,
        })
    }
}

export {getProduct};