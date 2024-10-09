const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('form');
const inputFile = document.querySelector('input');
const buttons = document.querySelectorAll('button');
const infoText = document.querySelector('h5');
const textArea = document.querySelector('textarea');

function fetchRequest(formData,file){
    infoText.innerHTML = 'Scanning QR Code...';
    fetch('https://api.qrserver.com/v1/read-qr-code/', {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerHTML = result ? "Upload QR Code To Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.classList.add('active');
        textArea.innerText = result;
        wrapper.querySelector('img').src = URL.createObjectURL(file);
    }).catch(() => {
        infoText.innerHTML = "Couldn't Scan QR Code";
    });
};

inputFile.addEventListener('change', e => {
    e.preventDefault();
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append("file",file);
    fetchRequest(formData,file);
});

form.addEventListener('click',() => inputFile.click());

buttons.forEach((btn) => {
    btn.addEventListener('click',() => {
        if(btn.innerText == 'Close') {
            wrapper.classList.remove('active');
        }
        else {
            window.open(textArea.innerHTML);
        }
    });
});