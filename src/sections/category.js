/*import { fetchCategoryProducts, fetchAllCategories } from '../api.js';

import { displayProductsOnDom } from "./products.js"


async function renderCategory(categoryID) {
    const products = await fetchCategoryProducts(categoryID);
    console.log(products)
    document.querySelector("#products-section h4").innerText = "Produits > " + products[0].category.name;
    displayProductsOnDom(products);
}


async function renderListCategories() {
    const categories = await fetchAllCategories();
    displayCategoryProductsOnDom(categories);
}

function displayCategoryProductsOnDom(categories) {
    console.log(categories);
    const listCategories = document.querySelector("#home-section .category-list");

    listCategories.innerHTML = ""; // clean all list to add properly

    for (const category of categories) {
        const catLink = document.createElement("a");
        catLink.href = "#categories-" + category.id;
        catLink.innerText = category.name;
        listCategories.appendChild(catLink);
    }
}

export { renderCategory, renderListCategories }*/


import { getAllCategories } from "../api";

const buttonCategory = document.querySelector(".category-list")
const rendButtonCategory = async () => {
    
    const categories = await getAllCategories();
    console.log(categories)

    categories.forEach(category => {
        const button = document.createElement("a");
        button.href = `#categories-${category.id}`;
        button.textContent = category.name;
        buttonCategory.appendChild(button);
    
    });
}

export{rendButtonCategory}