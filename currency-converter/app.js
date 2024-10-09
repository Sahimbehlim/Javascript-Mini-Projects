const dropdownList = document.querySelectorAll('select');
let fromDropdown = document.querySelector('#from-currency');
let toDropdown = document.querySelector('#to-currency');
const result = document.querySelector('span');
const btn = document.querySelector('button');
const swapbtn = document.querySelector('i');

// Adding Option Tags In From Select Box
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropdown.add(option);
});

// Adding Option Tags In To Select Box
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropdown.add(option);
});

// Default Values
fromDropdown.value = "USD"
toDropdown.value = "INR"

// Convert Currency
let convertCurrency = () => {
    const amount = document.querySelector('input').value;
    if(amount < 0){
        result.innerHTML = `<span>Please Add Positive Value</span>`;
    }
    else if(amount.length != 0){
        result.innerHTML = "Converting Please Wait ...";
        let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromDropdown.value}`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let exchangeRate = data.conversion_rates[toDropdown.value];
            let totalExchange = (amount * exchangeRate).toFixed(2);
            result.innerHTML = `${amount} ${fromDropdown.value} = ${totalExchange} ${toDropdown.value}`;
        });
    }
    else {
        result.innerHTML = `<span>Please Add Value</span>`;
    }
};

// Convert On Loading Window
window.addEventListener('load',() => {
    convertCurrency();
});

// Convert On Button Click
btn.addEventListener("click",(e) => {
    e.preventDefault();
    convertCurrency();
});

// Loading Flag
function loadFlag(elem){
    currencies.forEach((currency) => {
        if(currency == elem.value){
            let str = currency;
            let lastIndex = str.lastIndexOf(" ");
            str = str.substring(2, lastIndex);
            let imgTag = elem.parentElement.querySelector('img');
            imgTag.src = `https://flagsapi.com/${str}/flat/64.png`;
        }
    })
};

// Parameter For Loading Flag
dropdownList.forEach((drop) => {
    drop.addEventListener('change',(e) => {
        loadFlag(e.target);
    })
});

// Swaping
swapbtn.addEventListener('click',() => {
    let tempDropdown;
    tempDropdown = fromDropdown.value;
    fromDropdown.value = toDropdown.value;
    toDropdown.value = tempDropdown;
    loadFlag(fromDropdown);
    loadFlag(toDropdown);
    convertCurrency();
});