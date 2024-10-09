const passwordInput = document.querySelector('input');
const eyeIcon = document.querySelector('.input i');
const requirementList = document.querySelectorAll(".conditions li");

/* An array of password requirements with corresponding 
   regular expressions and index of the requirement list item */
const requirements = [
    { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
    { regex: /[0-9]/, index: 1 }, // At least one number
    { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
    { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
    { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
];

passwordInput.addEventListener("keyup", (e) => {
    requirements.forEach((item) => {
        // Check if the password matches the requirement regex
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];
        if(isValid){
            requirementItem.firstElementChild.className = "ri-check-line";
            requirementItem.classList.add('valid');
        }
        else {
            requirementItem.firstElementChild.className = "ri-circle-fill";
            requirementItem.classList.remove('valid');
            
        }
    })
});

eyeIcon.addEventListener('click',() => {
    // Toggle the password input type between "password" and "text" & icon
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    if(passwordInput.type === "text"){
        eyeIcon.className = "ri-eye-off-line";
    }
    else {
        eyeIcon.className = "ri-eye-fill";
    }
});