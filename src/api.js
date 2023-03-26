const BASE_URL = "https://webmobui-22-exa-backend.herokuapp.com/api"


function loadJson(url) {
    return fetch(url).then((response) => response.json())
  }

function getProducts(){
    return loadJson(`${BASE_URL}/products`)
}

function getDetailsForProduct(id) {
    return  loadJson(`${BASE_URL}/products/${id}`)
  }

function getCategory(id){
    console.log(id)
    return loadJson(`${BASE_URL}/categories/${id}/products`)
}

function getAllCategories(){
    return loadJson(`${BASE_URL}/categories`)
}

export {getProducts, getCategory,getDetailsForProduct,getAllCategories}