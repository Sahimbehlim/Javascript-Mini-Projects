const colorInputs = document.querySelectorAll('.input-color input');
const gradientBox = document.querySelector('.gradient-box');
const direction = document.querySelector('select');
const textarea = document.querySelector('textarea');
const refreshBtn = document.querySelector('.btn-secondary');
const copyBtn = document.querySelector('.btn-success');

const getRandomColor = () => {
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${randomHex}`;
}

const generateGradient = (isRandom) => {
    if(isRandom) {
        colorInputs[0].value = getRandomColor();
        colorInputs[1].value = getRandomColor();
    }
    const gradient = `linear-gradient(${direction.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
    gradientBox.style.background = gradient;
    textarea.value = `background: ${gradient};`;
};

const copyCode = () => {
    navigator.clipboard.writeText(textarea.value);
    copyBtn.innerText = 'Code Copied';
    setTimeout(() => copyBtn.innerText = 'Copy Code',1000);
};

colorInputs.forEach(input => {
    input.addEventListener('input',() => generateGradient(false));
});

direction.addEventListener('change',() => generateGradient(false));
refreshBtn.addEventListener('click', () => generateGradient(true));
copyBtn.addEventListener('click',copyCode);