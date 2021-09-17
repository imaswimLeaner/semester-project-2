import { baseUrl } from "../../settings/api.js";
import warningMessage from "../warningMessage.js";
import { filterAdminProducts } from "../../utils/filterProducts.js";



export default async function getProducts() {
    try {
        const productsUrl = baseUrl + "/products";
        const response = await fetch(productsUrl);
        const products = await response.json();

        filterAdminProducts(products);
        createAdminProducts(products);

    } catch (error) {
        console.log(error);
    }
}

export function createAdminProducts(products) {
    const container = document.querySelector(".admin .container__products");
    container.innerHTML = "";

    if (products.length === 0) {
        container.classList.remove("row");
        warningMessage("alert-warning", "No products matched your search", ".search-warning");

    } else {
        container.classList.add("row");
        const warning = document.querySelector(".search-warning");
        warning.style.display = "none";
        container.innerHTML = `                
        <div class="col mb-4 single__product">
        <div class="card  h-100  single__product">
            <div class="h-100 d-flex flex-column justify-content-between">
                <div class="card-body d-flex flex-column justify-content-center">
                    <a href="addnew.html"><i class="fas fa-plus icon--add"></i></a>
                </div>
                <div class="card-footer w-100">
                    <a href="addnew.html">Add new product</a>
                </div>
            </div>
        </div>
        </div>`;


        products.forEach(function (product) {
            
            let imageUrl = '';

			if (!product.image_url) {
				imageUrl = baseUrl + product.image.url;
				} else {
				imageUrl = product.image_url;
				}
            
            let featured = "";
            if (product.featured === null || !product.featured) {
                featured = false;
            } else {
                featured = true;
            }
            if (featured) {
                container.innerHTML += `
                <div class="col mb-4 single__product">
                    <div class="card  h-100">
                    <div class="card--featured">
                    <a href="edit.html?id=${product.id}"><img src="${imageUrl}" class="card-img-top" alt="${product.title} soap"></a>
                    <p>Bestseller</p>
                    </div>
                        <div class="d-flex flex-column justify-content-between">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">$${product.price}</p>
                            </div>
                        <div class="card-footer w-100">
                            <a href="edit.html?id=${product.id}">Edit</a>
                        </div>
                        </div>
                    </div>
                </div>`;
            } else {
               
               
                container.innerHTML += `
                <div class="col mb-4 single__product">
                <div class="card  h-100">
                <a href="edit.html?id=${product.id}"><img src="${imageUrl}" class="card-img-top" alt="${product.title} soap"></a>
                    <div class="d-flex flex-column justify-content-between">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price}</p>
                        </div>
                    <div class="card-footer w-100">
                        <a href="edit.html?id=${product.id}">Edit</a>
                    </div>
                    </div>
                </div>
                </div>`;
                }

                });
                }
             }   