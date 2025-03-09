let currentProgress = 0;
document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("registerButton");
    registerButton.addEventListener("click", createInputField);
})

function createInputField () {
    const registerButton = document.getElementById("registerButton");
    registerButton.classList.add("disabled");
    registerButton.removeEventListener("click", createInputField);
    const progressBar = document.querySelector(".progress");
    progressBar.style.visibility = "visible";
    const mainSection = document.getElementById("mainSection");
    let inputText = fieldType();
    const registrationForm = document.createElement("form");
    registrationForm.classList.add("form");
    registrationForm.id = "registForm";
    mainSection.appendChild(registrationForm);
    const inputField = document.createElement("section");
    inputField.id = "input";
    registrationForm.appendChild(inputField);
    const inputLabel = document.createElement("label");
    inputLabel.innerText = capitalize(inputText) + ":\t";
    inputLabel.style.marginRight = "5%";
    inputField.appendChild(inputLabel);
    const input = document.createElement("input");
    input.id = inputText;
    input.type = inputType(fieldType);
    inputField.appendChild(input);
    inputLabel.addEventListener("click", () => {
       document.getElementById(input.id).focus();
    })
    const nextButton = document.createElement("button");
    nextButton.classList.add("button");
    nextButton.innerText = "Submit";
    nextButton.id = "next";
    registrationForm.appendChild(nextButton);
    nextButton.addEventListener("click", newField);
}

function fieldType () {
    progress = progressStatus();
    switch (progress) {
        case 0: return "username";
        case 1: return "password";
        case 2: return "email"
    }
}

function inputType(fieldType) {
    switch (fieldType) {
        case "username": return "text";
        case "password": return "password";
        case "email": return "email";
    }
}
function updateProgress () {
    currentProgress++;
    progressStatus ();
    
}

function progressStatus () {
  const progressBar = document.getElementById("progressBar");
  progressBar.value = currentProgress;
  return currentProgress;
}

function newField () {
   //TODO: Input Validation
    updateProgress();
    if (currentProgress === 3) {
        currentProgress = 0;
        return; 
    }
    const previousForm = document.getElementById("registForm");
    previousForm.parentNode.removeChild(previousForm);
    createInputField();
}

function isValid (validationPattern) {
    let pattern = validationPattern(inputType,fieldType);
    return pattern.test(pattern);
}

function validationPattern (inputType,fieldType) {
    switch(inputType(fieldType)) {
        case "password":
            return "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/i";
        case "email":
            return "/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i";    
    }
}

function capitalize (string) {
    return string[0].toUpperCase()+string.slice(1);
}

/* 
function showEmailValidationState(event) {
            if (validateEmail(event.target.value)) {
                document.getElementById("emailInput").style.color = 'black';
            }
        }
    document.getElementById("emailInput").addEventListener("keyup", showEmailValidationState) 
*/