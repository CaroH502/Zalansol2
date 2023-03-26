import "./css/index.css";
/*import { domOn, domForEach } from './lib/domManipulator'
import { renderProducts, renderProduct } from './sections/products.js';
import { renderCategory, renderListCategories } from './sections/category.js';
import { getCart } from './cartStorage.js';
import { renderCart } from "./sections/cart.js"

navigator.serviceWorker.register('/workerCacheFetched.js');


window.addEventListener("cart_event", function(e) {
    displaySection()
});


function toggleSection(section) {
    const sectionActive = document.querySelector('section.active');
    if (sectionActive) {
        sectionActive.classList.remove("active");
    }
    const sectionToDisplay = document.querySelector(`${section}-section`);
    if (sectionToDisplay) {
        sectionToDisplay.classList.add('active');
    }

}

function toggleNav(section) {
    const navToDisabled = document.querySelector('nav a.active');
    if (navToDisabled) {
        navToDisabled.classList.remove('active')
    }
    const navLinkToActive = document.querySelector(`nav a[href="${section}"]`);
    if (navLinkToActive) {
        navLinkToActive.classList.add('active')

    }
}

function displaySection() {
    const section = window.location.hash || '#home'
    const sectionSplit = section.split('-')

    // Toggle par défaut des sections et de la navigation
    toggleSection(sectionSplit[0])
    toggleNav(sectionSplit[0])


    // Chargement des éléments custom par section
    switch (sectionSplit[0]) {
        case "#home":
            renderListCategories();
            break;
        case '#products':
            // Est-ce qu'il y a un id ? typiquement: #products-1234
            if (sectionSplit[1]) {
                toggleSection("#product")
                renderProduct(sectionSplit[1])
            } else {
                renderProducts()
            }
            break;
        case '#categories':
            if (sectionSplit[1]) {
                toggleSection("#products");
                renderCategory(sectionSplit[1])
            }

        case "#cart":
            toggleSection("#products")
            renderCart();

            break;
    }


}

window.addEventListener('hashchange', displaySection)

displaySection()*/

import { renderProducts, renderCartSection } from "./sections/products";
import { renderCategory } from "./sections/products";
import { rendDetailsPourProduit } from "./sections/products";
import { rendButtonCategory } from "./sections/category";

const displaySection = (hash) => {
  if (hash == "") hash = "#home";

  const hashSplit = hash.split("-");
  toggleNav(hashSplit[0]);
  toggleSection(hashSplit[0]);

  switch (hashSplit[0]) {
    case "#products":
      if (hashSplit[1]) {
        toggleSection("#product");
        rendDetailsPourProduit(hashSplit[1]);
      } else {
        renderProducts();
      }
      break;

    case "#categories":
      if (hashSplit[1]) {
        toggleSection("#products");
        renderCategory(hashSplit[1]);
      }
      break;

    case "#cart":
      toggleSection("#products");
      renderCartSection();
      break;
  }
};

const toggleSection = (hash) => {
  document.querySelector(`section.active`)?.classList.remove("active");
  document.querySelector(`${hash}-section`)?.classList.add("active");
};

const toggleNav = (hash) => {
  document.querySelector(`nav a.active`)?.classList.remove("active");
  document.querySelector(`nav a[href="${hash}"]`)?.classList.add("active");
};

window.addEventListener("cart_updated", () => {
  if (window.location.hash == "#cart") 
  renderCartSection();
});

window.addEventListener("hashchange", () =>
  displaySection(window.location.hash)
);
rendButtonCategory();
displaySection(window.location.hash);

window.addEventListener('offline', () => document.body.classList.add('offline'))
window.addEventListener('online', () => document.body.classList.remove('offline'))

navigator.serviceWorker.register(new URL('workerCacheFetched.js', import.meta.url))

