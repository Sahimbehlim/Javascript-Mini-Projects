// Get the DOM elements
const input = document.querySelector('input'),
    result = document.querySelector('.result'),
    button = document.querySelector('button'),
    remainChances = document.querySelector('.chances'),
    headText = document.querySelector('.headtext'),
    chancePara = document.querySelector('.chancepara');

// Set the focus on input field
input.focus();

// Generate random number
let randomNumber = Math.floor(Math.random() * 100);
console.log(randomNumber);
chance = 10;

// Click event on button
button.addEventListener('click',() => {
    // Decrement chance on every click
    chance--;
    // Get the value from input field
    let inputValue = input.value;
    
    // If input is empty
    if(inputValue == ""){
        // Update result text and color
        [result.textContent, result.style.color] = ["Please enter value", "#DE0611"];
    }
    // Check if the input value is equal to random number
    else if(inputValue == randomNumber){
        // Update result text and color, disable input, hide button.
        [result.textContent, input.disabled] = ["Congratulations", true];
        [headText.textContent,result.style.color, button.style.display] = ["You guess right number","green", "none"];
        // Loading game again after 3 seconds 
        [chancePara.textContent] = ["Game is loading in few seconds.."];
        setInterval(() => {
            window.location.reload();
        }, 3000);
    }
    // Check if input value is > random number and within 1-99 range.
    else if(inputValue > randomNumber && inputValue <= 100){
        // Update the result and remaining chances
        [result.textContent, remainChances.textContent] = ["Your guess is high", chance];
        result.style.color = "#444";
    }
    // Check if input value is < random number and within 1-99 range.
    else if(inputValue < randomNumber && inputValue > 0){
        // Update the result and remaining chances
        [result.textContent, remainChances.textContent] = ["Your guess is low", chance];
        result.style.color = "#444";
    }
    // If the input value is not within range of 1 to 99 
    else {
        // Update the result text, color and remaining chances
        [result.textContent, remainChances.textContent] = ["Your number is invalid", chance];
        result.style.color = "#DE0611";
    }
    // Check if chance is zero
    if(chance == 0){
        // Update button, disable input, and clear input value.
        // Update result text and color to indicate user loss.
        [button.textContent, input.disabled,inputValue] = ["Replay", true, ""];
        [result.textContent, result.style.color] = ["You lost the game", "#DE0611"];
    }
    if(chance < 0){
        window.location.reload();
    }
});