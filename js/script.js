
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

function createProduct(parent, imgUrl, productTitle, textPrice) {
  const product = document.createElement("div");
  product.className = "product";

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);
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

// fetch("https://fakestoreapi.com/products") // <== importare la lista prodotti in modo remoto
//   .then((response) => response.json())
//   .then((data) => {
//     products = data;
//     renderProducts();
//   });

let products = [];
const wrapperProducts = document.querySelector(".wrapper__products");

function renderProducts() {
  products.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price);
  });
}

const getProductsList = async() => {
  const resp = await fetch ("https://fakestoreapi.com/products");
  const data = await resp.json();
  products = data;
  return renderProducts();
}

getProductsList();