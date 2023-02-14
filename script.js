let page = 1;
const container = document.querySelector('.container');
const loader = document.querySelector('.loader');

function getData() {
	fetch(`https://ovi.storrea.com/store/apps/product_filter_app/filters/29286/collection_results?&page=${page}&per_page=15&sort_by=product_collections.position%20ASC&format=json`)
		.then((response) => response.json())
		.then((results) =>{
    results = results.products;
    console.log(results)
      drawResults(results)    
  });
}

function drawResults(results) {
	const html = results
		.map(
			(result) =>
				`
        <div class="result">
        <img src="${result.featured_image_urls.square}">
        <h3>${result.name}</h3>
        <p>${result.id}</p>
        </div>
        `
		)
		.join('');
  page++;
	container.innerHTML += html;
}

document.addEventListener('DOMContentLoaded', getData);
window.addEventListener('scroll', () => {
	if (
		document.documentElement.scrollTop +
			document.documentElement.clientHeight >=
		document.documentElement.scrollHeight
	) {
		loader.classList.remove('hidden');
		setTimeout(() => {
			loader.classList.add('hidden');
			getData();
		}, 2000);
	}
});
