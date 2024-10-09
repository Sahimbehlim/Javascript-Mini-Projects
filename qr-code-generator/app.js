const wrapper = document.querySelector('.wrapper');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const qrImg = document.querySelector('img');

btn.addEventListener('click',(e) => {
    e.preventDefault();
    let qrValue = input.value;
    input.placeholder = qrValue ? "Enter text or url" : "Input can't be empty";
    if(!qrValue) return;
    btn.innerText = 'Generating...';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    qrImg.addEventListener('load',() => {
        wrapper.classList.add('active');
        btn.innerText = 'Generate QR Code';
    });
});