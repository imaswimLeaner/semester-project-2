import { baseUrl } from './settings/api.js';
import createMenu from "./components/menu.js";
import { getHero } from "./components/header.js";
import  createFooter  from './components/createFooter.js';
import getFeaturedProducts from "./components/featuredProducts.js";


const heroUrl = baseUrl + '/home';

(async function () {
	try {
		const response = await fetch(heroUrl);
		const json = await response.json();

		getHero(json);
	} catch (error) {
		console.log(error);
	}
})();




createMenu();
createFooter();
getFeaturedProducts();