import JsonStorage from './lib/jsonStorage.js';


const cartStorage = new JsonStorage({ name: "cart", eventName: "cart_event" });


function getCart() {
    let items = cartStorage.toArray().map(e => e[1]);

    let cart = [];
    items.forEach(item => {
        if (item) {
            cart.push(item)
        }
    });

    return cart;

}

function addItemToCart(product) {
    cartStorage.setItem(product.id, product);
}

function isInCart(product) {
    return product && cartStorage.getItem(product.id);
}

function removeItemToCart(product) {
    cartStorage.removeItem(product.id);
}

export { getCart, addItemToCart, isInCart, removeItemToCart }