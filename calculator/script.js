var btn = document.querySelectorAll('button');
var inpArea = document.querySelector('input');
var input = "";

btn.forEach((e) => {
    e.addEventListener('click', () => {
        var btnValue = e.innerText;
        if (btnValue == 'C') {
            input = "";
            inpArea.value = input;
        }
        else if (btnValue == "=") {
            input = eval(input);
            inpArea.value = input;
        }
        else {
            input = input + btnValue;
            inpArea.value = input;
        }
    })
})
