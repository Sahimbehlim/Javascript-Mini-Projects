const select = document.querySelectorAll('select');
let textAreaInput = document.querySelector('.input');
let output = document.querySelector('.output');
let button = document.querySelector('button');
let swapBtn = document.querySelector('.swap');
let icons = document.querySelectorAll('.icons i');

// Adding Options Tag In Select Tag
select.forEach(element => {
    for (var key in languages) {
        let option = document.createElement('option');
        option.text = languages[key];
        option.value = key;
        element.appendChild(option);
    }
});

// Setting Default Values
select[0].value = "en-GB";
select[1].value = "hi-IN";

// Translate Function
let translate = () => {
    let text = textAreaInput.value;
    let translateFrom = select[0].value;
    let translateTo = select[1].value;
    if (!text) {
        return output.setAttribute("placeholder", "Please Insert Value");
    }
    output.innerHTML = "Translating ...";
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiURL).then((response) => {
        return response.json();
    }).then((result) => {
        output.innerHTML = `${result.responseData.translatedText}`;
    }).catch(() => {
        output.innerHTML = `Error While Translating`;
    })
}

// Calling Translate Function On Btn Click
button.addEventListener('click', (e) => {
    e.preventDefault();
    translate();
});

swapBtn.addEventListener('click', () => {
    // Exchanging Text Area & Select Tag Values
    let tempText = textAreaInput.value;
    let tempLang = select[0].value;
    textAreaInput.value = output.value;
    select[0].value = select[1].value;
    output.value = tempText;
    select[1].value = tempLang;
})

// Speech & Copy Icon Working
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
            if (target.id == "from") {
                navigator.clipboard.writeText(textAreaInput.value);
            }
            else {
                navigator.clipboard.writeText(output.value);
            }
    });
});