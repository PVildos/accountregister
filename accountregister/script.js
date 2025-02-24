let currentProgress = 0;
let pattern;
let input;
document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("registerButton");
    registerButton.addEventListener("click", createInputField);

})

function createInputField () {
    const registerButton = document.getElementById("registerButton");
    registerButton.classList.add("disabled")
    registerButton.removeEventListener("click", createInputField);
    const progressBar = document.getElementById("progressBar");
    progressBar.style.visibility = "visible";
    const registerSection = document.getElementById("registerSection");
    let input = fieldType();
    const registrationForm = document.createElement("form");
    registrationForm.id = "registForm";
    registerSection.appendChild(registrationForm);
    const inputLabel = document.createElement("label");
    inputLabel.innerText = capitalize(input) + ": ";
    registrationForm.appendChild(inputLabel);
    const inputField = document.createElement("input");
    inputField.id = input;
    registrationForm.appendChild(inputField);
    inputLabel.addEventListener("click", () => {
       document.getElementById(inputField.id).focus();
    })
    const nextButton = document.createElement("button");
    nextButton.innerText = "Submit";
    nextButton.id = "next";
    registrationForm.appendChild(nextButton);
    nextButton.addEventListener("click", newField);
}

function fieldType () {
    let progress = progressStatus();
    switch (progress) {
        case 0: return "username";
        case 1: return "password";
        case 2: return "email"
    }
}

function updateProgress () {
    currentProgress++;
    progressStatus ();
    
}

function capitalize (string) {
    return string[0].toUpperCase()+string.slice(1);
}

function progressStatus () {
  const progressBar = document.getElementById("progressBar");
  progressBar.value = currentProgress;
  return currentProgress;
}

function newField () {
   /* switch (currentProgress) {
        case 1:
            const inputText = document.getElementById(input);
            inputText.type = "password";
            const submitButton = document.getElementById("next");
            submitButton.addEventListener("click", (event) => {
                if (!passwordValidation(inputText)) {
                    event.preventDefault();
                    const registrationForm = document.getElementById("registForm");
                    const passwordError = document.createElement("p");
                    passwordError.style.color = "red";
                    passwordError.innerText = "Invalid Email";
                    registrationForm.appendChild(passwordError);
                }
            })
            break;
        case 2:
            inputText = document.getElementById(input);
            submitButton = document.getElementById("next");
            submitButton.addEventListener("click", (event) => {
                if (!emailValidation(inputText)) {
                    event.preventDefault();
                    const registrationForm = document.getElementById("registForm");
                    const emailError = document.createElement("p");
                    emailError.style.color = "red";
                    emailError.innerText = "Invalid Email";
                    registrationForm.appendChild(emailError);
                }
            })
            break;
        default:
            break;
    }*/
    updateProgress();
    if (currentProgress === 3) {
        currentProgress = 0;
        return; 
    }
    const previousForm = document.getElementById("registForm");
    previousForm.parentNode.removeChild(previousForm);
    createInputField();
}

function emailValidation (email) {
    pattern = "/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i";
    return pattern.test(email)
}
function passwordValidation (password) {
    pattern = "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/i";
    return pattern.test(password);
}

/* 
function showEmailValidationState(event) {
            if (validateEmail(event.target.value)) {
                document.getElementById("emailInput").style.color = 'black';
            }
        }
    document.getElementById("emailInput").addEventListener("keyup", showEmailValidationState) 
*/