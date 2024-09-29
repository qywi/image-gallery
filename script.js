const accessKey = 'wIre3ooRwaIR07A7_YX3-Wt-4wsN4DSf6NzZo0zje6o';
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const clearSearchButton = document.getElementById('clearSearch');

async function loadImages(query = '') {
    const apiUrl = query
        ? `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=21`
        : `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=21`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const images = query ? data.results : data;

    displayImages(images.slice(0, 21));
}

function displayImages(images) {
    gallery.innerHTML = ''; 

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description || 'Image from Unsplash';
        gallery.appendChild(imgElement);
    });
}

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadImages(searchInput.value);
    }
});

clearSearchButton.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    loadImages();
});

window.onload = () => {
    searchInput.focus();
    loadImages();
};

searchInput.setAttribute('autocomplete', 'off');
