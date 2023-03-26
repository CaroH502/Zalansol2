/*import { getCart } from "../cartStorage.js";
import { displayProductsOnDom } from "./products.js";

function renderCart() {
    const items = getCart();
    console.log(items);

    document.querySelector("#products-section h4").innerText = "Panier (" + items.length + ")";

    displayProductsOnDom(items);
}

export { renderCart }*/

import JsonStorage from '../lib/JsonStorage'

const cartStorage = new JsonStorage({ name: 'cart', eventName: 'cart_updated' })

// Cette fonction toggle une chanson au sein de la liste des favoris
const toggleCart = (product) => {
   
  if(isInCart(product)) {
    cartStorage.removeItem(product.id)
    console.log("remove")
  } else {
    cartStorage.setItem(product.id, product)
    console.log(cartStorage)
  }
}

// Vérifie si une chanson est dans les favoris (retourne l'entry si oui, undefined si non)
const isInCart = (product) => {
  return cartStorage.getItem(product.id)
}

// Retourne la liste des favoris sous forme de tableau avec seulement la valeur (voir slides pour explication)
const getCart = () => {
  return cartStorage.toArray().map((e) => e[1])
}

export { toggleCart, isInCart, getCart }
