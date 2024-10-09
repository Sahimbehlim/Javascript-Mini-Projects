let inputBox = document.querySelector('input');
let searchBtn = document.querySelector('button');
let data = document.querySelector('.data');

searchBtn.addEventListener('click',() => {
    data.classList.add('active');
    let countryName = inputBox.value;
    let countryURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    fetch(countryURL).then((response) => {
        return response.json();
    }).then((result) => {
        let langarr = Object.values(result[0].languages);
        const slicelangarr = langarr.slice(0,3);
        console.log(slicelangarr);
        data.innerHTML = `
                    <div class="d-flex flex-column align-items-center mt-4">
                        <img src = "${result[0].flags.png}" class="img-fluid">
                        <h2 class="pt-3">${result[0].name.common}</h2>
                    </div>
                    <div class="mt-2">
                        <h5>Capital : ${result[0].capital[0]}</h5>
                        <h5>Continent : ${result[0].continents[0]}</h5>
                        <h5>Population : ${result[0].population}</h5>
                        <h5>Currency : ${result[0].currencies[Object.keys(result[0].currencies)].name} - ${Object.keys(result[0].currencies)[0]}</h5>
                        <h5>Common Languages : ${slicelangarr}</h5>
                    </div>`;
    }).catch(() => {
        if(countryName.length == 0){
            data.innerHTML = `<h5 class="text-danger pt-3 fw-semibold">Input Field Cannot Be Empty</h5>`;
        } else {
            data.innerHTML = `<h5 class="text-danger pt-3 fw-semibold"">Please Insert Valid Country Name</h5>`;
        }
    });
});