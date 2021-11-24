
const wrapHero = document.querySelector(".__hero");
let images = [
    "./img/hero.png",
    "./img/hero2.png",
    "./img/hero3.png"
]

var i = 0;
setInterval(function() {
      wrapHero.style.backgroundImage = "linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(" + images[i] + ")";
      i = i + 1;
      if (i == images.length) {
        i =  0;
      }
}, 5000);
   
function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();
    alert(`Prodotto aggiunto al carrello, numero prodotti: ${cartList.length}`);
    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage
    localStorage.setItem("totCartitems", cartList.length);
  });
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  // Nella eventualità di aggiungere una quantità per prodotto
  // productsList = data.map((product) => {
  //   product.quantity = 0;
  //   return product;
  // });

  return renderProducts(data);
};

let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];

let localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");

if (localStorageTot === null){
  localStorageTot = 0;
}

// Flusso generale
cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  localStorage.setItem("totCartitems", cartList.length);
  setCartProductsNum();
});