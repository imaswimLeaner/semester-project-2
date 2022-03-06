/** @format */
export function getHero(home) {
	const container = document.querySelector('.header__background');
	console.log(home.hero_banner[0].url);

	container.style.background = `url(${home.hero_banner[0].url}) no-repeat center `;
	container.style.backgroundSize = 'cover';
}
