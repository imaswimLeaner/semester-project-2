import createMenu from "./components/menu.js";
import { getUsername, getToken } from "./utils/userStorage.js";
import filterProducts from "./utils/filterProducts.js";
import getProducts from "./components/admin/adminProducts.js";
import createFooter from './components/createFooter.js';

if (!getToken()) {
    location.href = "/";
}

filterProducts();
getProducts();
createMenu();
createFooter();

const username = getUsername();

const h1 = document.querySelector("h1");
h1.innerHTML = `Hello ${username} <i class="fas fa-users-cog"></i>!`;