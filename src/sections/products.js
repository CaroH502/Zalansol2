/*import { fetchProducts, fetchProduct } from "../api";
import { addItemToCart, isInCart, removeItemToCart } from '../cartStorage.js';



const productSection = document.getElementById("products-section");
const productsList = document.getElementsByClassName("product-list")[0];
const productItem = document.querySelector("article.product-list-item");


async function renderProducts() {
    const products = await fetchProducts();
    console.log(products);
    displayProductsOnDom(products);
}

function displayProductsOnDom(products) {
    const tmpl = productItem;

    tmpl.classList.remove("tmpl");

    productsList.innerHTML = ""; // clean all list to add properly

    for (const product of products) {
        if (!product) return;
        const newProduct = tmpl.cloneNode(true);

        newProduct.querySelector("a.product-list-item-image-link").href = "#products-" + product.id;
        newProduct.querySelector("a.product-list-item-image-link img").src = product.image_url;
        newProduct.querySelector(".product-list-item-name").innerText = product.name;
        newProduct.querySelector("a.product-list-item-category").href = "#categories-" + product.category.id;
        newProduct.querySelector("a.product-list-item-category").innerText = product.category.name;
        const button = newProduct.querySelector("button.icon-button.cart-button");
        onClickCartButton(button, product);
        toggleIcon(button.querySelector("span"), product);

        productsList.appendChild(newProduct);
    }
}

function toggleIcon(icon, product) {
    if (isInCart(product)) {
        icon.innerText = "remove_shopping_cart";
    } else {
        icon.innerText = "add_shopping_cart";
    }
}

function onClickCartButton(button, product) {
    button.addEventListener("click", function() {
        console.log(product.id)
        toggleIcon(button.querySelector("span"), product);

        if (isInCart(product)) {
            console.log("WILL REMOVE : " + product.id)
            removeItemToCart(product);
        } else {
            console.log("WILL ADD : " + product.id)

            addItemToCart(product);
        }

    });
}

async function renderProduct(productID) {
    const product = await fetchProduct(productID);
    displayProductOnDom(product);
}

function displayProductOnDom(product) {
    console.log(product);

    const tmpl = document.querySelector("#product-section");

    tmpl.querySelector("#product-section h4").innerText = "Produits > " + product.name;
    tmpl.querySelector(".product-category-link").innerText = product.category.name;
    tmpl.querySelector(".product-category-link").href = "#categories-" + product.category.id;
    tmpl.querySelector(".product-image-wrapper img").src = product.image_url;

}

export { renderProducts, renderProduct, displayProductsOnDom }*/
import { getDetailsForProduct, getProducts } from '../api'
import { getCategory } from '../api'
import { getCart, toggleCart, isInCart } from './cart'

const productListItemTemplate = document.querySelector('#product-list-item-template')
const productList =  document.querySelector('.product-list')
const categorySectionTitle = document.querySelector('#product-section h4')
const categoryName = document.querySelector('.product-category-link')
const imgForPorduct = document.querySelector('.product-image-wrapper img')

async function renderProducts() {
    const products = await getProducts();
    console.log(products);
    displayProductsOnDom(products);
}

const displayProductsOnDom = async (products) => {
    productList.replaceChildren();
    console.log(products)

    products.forEach((product) => {

        const newProductItem = productListItemTemplate.content.cloneNode(true)
        newProductItem.querySelector('a').href = '#products-' + product.id
        newProductItem.querySelector('.product-list-item-name').innerHTML = product.name
        newProductItem.querySelector('.product-list-item-category').innerHTML = product.category.name
        newProductItem.querySelector('.product-list-item-category').href=`#categories-${product.category.id}`
        newProductItem.querySelector('img').src = product.image_url
        const cartIcon = newProductItem.querySelector('.cart-button .material-icons')
        
        //addEventListener sur les nom de catégories
        newProductItem.querySelector('.product-list-item-category').addEventListener('click', () => {
            window.location.hash = `#categories-${product.category.id}`
          })

          newProductItem.querySelector('.cart-button').addEventListener('click', () => {
            toggleCart(product)
            toggleCartIcon(cartIcon, product) // on passe le target du click, à savoir l'icône
          })

          toggleCartIcon(cartIcon, product)
        productList.append(newProductItem) 

    
    })
}

const renderCartSection = () => {
    const carts = getCart()
    console.log(carts)
  
    // Set le titre de la section
    categorySectionTitle.innerText = 'Cart'
    displayProductsOnDom(carts)
  }


const rendDetailsPourProduit = async (productId) => {
    const details = await getDetailsForProduct(productId)
    console.log(details)
    categorySectionTitle.textContent = `Produits > ${details.name}`
    categoryName.textContent = details.category.name
    imgForPorduct.src=details.image_url
}

const toggleCartIcon = (cartIcon, product) => {
    if(isInCart(product)) {
      cartIcon.innerText = 'remove_shopping_cart' // ou favorite pour le coeur plein
    } else {
      cartIcon.innerText = 'add_shopping_cart'  // ou favorite_border pour le coeur vide
    }
  }

const renderCategory = async (categoryId) => {
    
    productList.replaceChildren();
    const categories = await getCategory(categoryId)
    console.log(categories)

    categories.forEach((product) => {
        const newProductItem = productListItemTemplate.content.cloneNode(true)
        newProductItem.querySelector('a').href = '#products-' + product.id
        newProductItem.querySelector('.product-list-item-name').innerHTML = product.name
        newProductItem.querySelector('.product-list-item-category').innerHTML = product.category.name
        newProductItem.querySelector('img').src = product.image_url
        const cartIcon = newProductItem.querySelector('.cart-button .material-icons')

        newProductItem.querySelector('.product-list-item-category').addEventListener('click', () => {

            window.location.hash = `#categories-${product.category.id}`
          })

          newProductItem.querySelector('.cart-button').addEventListener('click', () => {
            toggleCart(product)
            toggleCartIcon(cartIcon, product) // on passe le target du click, à savoir l'icône
          })
        productList.append(newProductItem) 
    })
}

export {rendDetailsPourProduit}
export {renderProducts, renderCartSection}
export {renderCategory}
