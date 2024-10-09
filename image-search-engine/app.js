const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('button');
const searchResult = document.querySelector('.result');
const showMoreBtn = document.querySelector('.show-more');

// Initial page value
let page = 1;
searchInput.focus();

// Search image functionality
const searchImg = async () => {
    // If input is empty
    if(searchInput.value == ""){
        alert("Input Can't Be Empty!");
        return;
    }

    // Fetching images
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${searchInput.value}&per_page=9&client_id=dPkzKKKTorZ1BJcHK2QGaHI6Z-GpVQIHjx3XoJ2uwc0`);
    
    // If not getting response
    if(response.status == 401 || response.status == 404){
        alert("Enter Correct Value.");
        return;
    }

    const data = await response.json();

    // To handle - if keyword in input is changed and click on search button
    if(page === 1){
        searchResult.innerHTML = "";
    }

    // Getting result and creating images as per results
    const result = data.results;
    result.map((res) => {
        const img = document.createElement('img');
        img.src = res.urls.small;
        searchResult.appendChild(img);
    })

    // Show more button is displayed when images are fetched once
    showMoreBtn.style.display = "block";
}

// Search for images on button click
searchBtn.addEventListener('click', () => {
    page = 1;
    searchImg();
});

// Show more images on button click
showMoreBtn.addEventListener('click',() => {
    page++;
    searchImg();
})