const refreshBtn = document.querySelector('button');
const colorBox = document.querySelectorAll('.color-box');

const generatePallete = () => {
    colorBox.forEach((e) => {
        for (let i = 0; i < 1; i++) {
            // Generating random hex code
            let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
            randomHex = `#${randomHex.padStart(6,"0")}`;
            
            e.innerHTML = `<div class="color" style="background:${randomHex}"></div>
                            <span>${randomHex}</span>`;
            e.addEventListener('click',() => copyColor(e,randomHex));
        }
    })
}

generatePallete();

    // Function to copy color code of a specific colorBox in clipboard
const copyColor = (elem,hexValue) => {
    const colorText = elem.querySelector('span');
    navigator.clipboard.writeText(hexValue).then(() => {
        colorText.innerHTML = 'Copied';
        setTimeout(() => {
            colorText.innerText = hexValue;
        }, 1000);
    }).catch(() => alert('Failed to copy the color code!'));
}

refreshBtn.addEventListener('click',generatePallete);