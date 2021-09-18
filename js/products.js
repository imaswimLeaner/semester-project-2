import createMenu from "./components/menu.js";
import getProducts from "./components/allProducts.js";
import filterProducts from "./utils/filterProducts.js";
import createFooter from './components/createFooter.js';

createMenu();
getProducts();
filterProducts();
createFooter();