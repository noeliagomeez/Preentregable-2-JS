//Array de objetos con los productos
const productos = [
    {
        id: 1,
        nombre: "1989 (Taylor's Version)",
        precio: 23,
        img: "https://umusicstore.com.ar/cdn/shop/files/CD1_JewelandPoster_800x.png?v=1691768476",
        cantidad: 1
    },
    {
        id: 2,
        nombre: "Speak Now (Taylor's Version)",
        precio: 16,
        img: "https://cdn.discordapp.com/attachments/1128922301518323723/1213218707346690109/Speak_Now_480x.png?ex=65f4acf8&is=65e237f8&hm=a3369d8a75b81c7f87606c58274a88907ea44c7d07cc0cb4ecfcc8d092c8330f&",
        cantidad: 1
    },
    {
        id: 3,
        nombre: "Midnights (Taylor's Version)",
        precio: 16,
        img: "https://umusicstore.com.ar/cdn/shop/products/CD5_IntlVersion_800x.png?v=1675780857",
        cantidad: 1
    },
    {
        id: 4,
        nombre: "Red (Taylor's Version)",
        precio: 16,
        img: "https://umusicstore.com.ar/cdn/shop/products/Red__Taylor_s_Version__-_Portada_800x.jpg?v=1639439457",
        cantidad: 1
    }
  ];


const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")


//Si hay productos en el localstorage, el carrito mantendrá los productos aunque se refresque la página. En caso contrario, el carrito se visualizará vacío.
let carrito =  JSON.parse(localStorage.getItem("carrito")) || []

//Se crea las cards de los productos
productos.forEach((product)=> {
  let content = document.createElement("div");
  content.className = "card"
  content.innerHTML = `
  <img src="${product.img}">
  <h3>${product.nombre}</h3>
  <p class= "price">${product.precio}$</p>
  `;
  shopContent.append(content)

//Añadir botón de comprar
  let comprar = document.createElement("button")
  comprar.innerText = "Comprar"
  comprar.className = "comprar"

  content.append(comprar)

  
//La cantidad del producto dentro del modal aumenta y no se multiplica el producto nuevamente. La cantidad aumenta una vez que uno ya se haya agregado.
  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)

    if (repeat) {
        carrito.map((prod) => {
            if (prod.id === product.id) {
                prod.cantidad++
            }
        })
    } else {
    carrito.push ({
        id: product.id,
        nombre: product.nombre,
        img: product.img,
        precio: product.precio,
        cantidad: product.cantidad,
    })
    }   
    saveLocal()
  }) 
});


//LOCALSTORAGE  

//set item 
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify (carrito))
}

//Creación del header del modal (interior del carrito)

const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header" 
    modalHeader.innerHTML = `
    <h1 class= "modal-header-title">Carrito</h1>
    `
    modalContainer.append(modalHeader)

    //Creacion de la "X" dentro del header del modal para poder cerrar la ventana
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    //Agrego evento de click al botón
    modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    //Se agrega los productos dentro del modal del carrito
    carrito.forEach((product) => {
    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3> ${product.nombre}</h3>
    <p> ${product.precio}$</p>
    <p> Cantidad: ${product.cantidad}</p>
    <p> Total: ${product.cantidad*product.precio}</p>
    `
    modalContainer.append(carritoContent)
    
    //Se agrega la opción de eliminar un producto del carrito
    let eliminar = document.createElement("span")
    
    eliminar.innerText = "❌"
    eliminar.className = "delete-product"
    carritoContent.append(eliminar)

    //Se agrega evento al botón "eliminar"
    eliminar.addEventListener("click", eliminarProducto)
    })
    //Se realiza una sumatoria del total a pagar
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
    
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: ${total} $`
    modalContainer.append(totalBuying)
    
}  

verCarrito.addEventListener("click", pintarCarrito )

//Función para eliminar el producto
const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })
    saveLocal()
    pintarCarrito()
}
