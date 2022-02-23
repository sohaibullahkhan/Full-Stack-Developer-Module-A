// Reteriving HTML elements from DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Funcation to update class and message for errors
function showError(input, message) {
    // Get the parent element of the input field (.form-control)
    const formControl = input.parentElement;
    // Override the class - add error
    formControl.className = 'form-control error';
    // Get the small element for the error message
    const small = formControl.querySelector('small');
    // Override the text for small element using the input message
    small.innerText = message;
}

// Funcation to update class for success
function showSuccess(input) {
    // Get the parent element of the input field (.form-control)
    const formControl = input.parentElement;
    // Replace the class - add success
    formControl.className = 'form-control success';
}

// Function to check if email is vaild
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* return re.test(String(email).toLowerCase()); */
    if ( re.test (input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input,`Please provide a valid email`);
    }

}

// Funcation to check if requried fields have data
function checkRequried(inputArray) {
    inputArray.forEach(function (input) {
       if (input.value === '') {
        //console.log(input.id);
           showError(input,`${getFieldId(input)} is requried`);
       } else {
           showSuccess(input);
       }
    });
}

// Funcation to check length of input field
function checkLength(input, max, min) {
    if (input.value.length > min) {
        showError(input,`${getFieldId(input)} needs to be at least ${min} characters`);
    } else if (input.value.length < max) {
        showError(input, `${getFieldId(input)} need to be less than ${max} characters`);
    } else {
        showSuccess(input);
    } 
}

// Funcation to check if password and confirm password match
function checkPasswordMatch(input1, input2) {
    if( input1.value !== input2.value ) {
        showError(input2,"Password don't match")
    }
}

// Funcation to get the id of the input field with proper case
function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// This is an Event Listner for the form on submit
form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    checkRequried([username,email,password,password2]);
    checkLength(username,3,10);
    checkLength(password,6,30);
    checkEmail(email);
    checkPasswordMatch(password,password2);

});