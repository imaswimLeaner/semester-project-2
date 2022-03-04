/** @format */

import { baseUrl } from '../settings/api.js';

export function getHero(home) {
	const container = document.querySelector('.header__background');

	container.style.background = `url('${baseUrl}${home.hero_banner.url}') no-repeat center `;
	container.style.backgroundSize = 'cover';
}
