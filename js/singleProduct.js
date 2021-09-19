import createMenu from "./components/menu.js";
import warningMessage from "./components/warningMessage.js";
import { baseUrl } from "./settings/api.js";
import { cartItemsKey, saveToStorage, getFromStorage } from "./utils/cartStorage.js";
import createFooter from './components/createFooter.js';

createMenu();
createFooter();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let id;

if (params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "index.html";
}

async function getSingleProduct() {
    try {
        const productsUrl = baseUrl + `/products?id=${id}`;
        const response = await fetch(productsUrl);
        const product = await response.json();
        createSingleProduct(product);
        isItemInCart(product);
        addToCart(product);
    } catch (error) {
        console.log(error);

        warningMessage("alert-danger", error, ".container__products--single");
    }
}

getSingleProduct();

function createSingleProduct(products) {
    let buttonText = "";
    if (isItemInCart(products)) {
        buttonText = "Remove from cart";
    } else {
        buttonText = "Add to cart";
    }

    const container = document.querySelector(".container__products--single");
    container.innerHTML = "";
    let featured = "";

    products.forEach(function (product) {
        console.log(product)
        document.title = "Bergs | " + product.title;
        if (product.featured === null || !product.featured) {
            featured = "";
        } else {
            featured = `<div class="card--featured">
            <p>Bestseller</p>
            </div>`;
        }
        

        const imageUrl = baseUrl+ product.image.url;
				

        container.innerHTML += `
        <div class="col-12 col-xl-8">
            <img src="${imageUrl}" class="w-100" alt="${product.title}">
        </div>
        <div class="col-12 col-xl-4 d-flex flex-column justify-content-center align-items-start product__info">
        ${featured}
            <h3>${product.title}</>
            <h5 class="product__description">${product.description}</h5>
            <p class="product__price">${product.price} NOK</p>
            <a class="btn btn-primary button" id="addToCartButton">${buttonText}</a>
        </div>`;
        const breadcrumb = document.querySelector(".breadcrumb-item.active");
        breadcrumb.innerHTML = `${product.title}`;
    });
    if (featured) {
        const featuredText = document.querySelector(".card--featured p");
        featuredText.style.position = "relative";
    }
}

function isItemInCart(product) {
    const cartItemsList = getFromStorage(cartItemsKey);
    const id = product[0].id;
    const itemInCart = cartItemsList.find(function (product) {
        return product.id === id;
    });
    if (itemInCart === undefined) {
        return false;
    } else {
        return true;
    }
}

function addToCart(product) {
    
    console.log(product)
    const button = document.querySelector("#addToCartButton");

    const id = product[0].id;
    

		
	const imageUrl = baseUrl + product[0].image.url;
		
            

    button.addEventListener("click", function (event) {
        const cartItemsList = getFromStorage(cartItemsKey);

        if (!isItemInCart(product)) {
            const cartItem = {
							id: product[0].id,
							title: product[0].title,
                            image: imageUrl[0].image,
							description: product[0].description,
							price: product[0].price,
							featured: product[0].featured,
						};

            cartItemsList.push(cartItem);
            saveToStorage(cartItemsKey, cartItemsList);
            event.target.innerText = "Remove from cart";

        } else {
            const newCartItemsList = cartItemsList.filter((product) => product.id !== id);
            saveToStorage(cartItemsKey, newCartItemsList);
            event.target.innerText = "Add to cart";
        }
    })
}