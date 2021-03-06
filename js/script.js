// Slider Hero
const wrapHero = document.querySelector(".__hero");
let images = [
  "./img/hero.png",
  "./img/hero2.png",
  "./img/hero3.png"
]

let i = 0;
setInterval(function () {
  wrapHero.style.backgroundImage = "linear-gradient(203deg, rgba(25,27,27,1) 0%, rgba(255,255,255,0.28644961402529767) 84%), url(" + images[i] + ")";
  i = i + 1;
  if (i == images.length) {
    i = 0;
  }
}, 5000);

// Slider reviews

const boxReview = document.querySelector("#review");
const reviewText = document.createElement("p");
reviewText.className = "text-review";
boxReview.appendChild(reviewText);

const dataReview = [`"Spedizioni sempre puntuali!"`, `"Sempre una garanzia, ottimi prodotti tutti originali!"`, `"Vasta scelta di prodotti e diverse taglie disponibili"`];

let index = 0;
setInterval(function () {
  reviewText.innerHTML = `${dataReview[index]} <br> ⭐⭐⭐`;
  index = index + 1;
  if (index == dataReview.length) {
    index = 0;
  }
}, 5000);


// Quantità di prodotti selezionati

function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

// Creazione delle schede prodotto e del contenuto

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

    const modaleCart = document.querySelector(".modale-cart");
    const modale = document.querySelector(".modale-text");
    modaleCart.classList.toggle("modale-on");
    modale.innerHTML = `Prodotto aggiunto al carrello! <br> Numero prodotti: ${cartList.length}`;
    setTimeout(() => { modaleCart.classList.toggle("modale-on") }, 2000);
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

function renderProducts() {
  productsList.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

// Funzione per mostrare il contenuto del carrello
function showCart() {
  document
    .querySelectorAll(".product")
    .forEach((product) => wrapperProducts.removeChild(product));
  renderProducts(JSON.parse(localStorageTot));
}

// Aggiunta dei buttons che mettono i prodotti in ordine alfabetico o di prezzo

const btnOrderAZ = document.querySelector("#btnAZ");
const btnPrice = document.querySelector("#btnPrice");


btnOrderAZ.addEventListener("click", () => {
  removeParent(wrapperProducts);

  productsList.sort((titleOne, titleTwo) => (titleOne.title > titleTwo.title) ? 1 : -1);
  renderProducts(productsList);
})

btnPrice.addEventListener("click", () => {
  removeParent(wrapperProducts);

  productsList.sort((priceOne, priceTwo) => (priceOne.price > priceTwo.price) ? 1 : -1);
  renderProducts(productsList);
})

function removeParent(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
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
const showCartBtn = document.querySelector(".btn-cart");



// Flusso generale

cartProductsNum.textContent = `Numero prodotti: ${localStorageTot || 0}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  localStorage.setItem("totCartitems", cartList.length);
  setCartProductsNum();
});

showCartBtn.addEventListener("click", showCart);