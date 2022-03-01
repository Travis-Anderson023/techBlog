let signUpButton = document.getElementById('signUp');
let emailToggle = document.getElementById('email-toggle');
let submit = document.getElementById('submit-button');
let haveAccount = document.getElementById('have-account');


signUpButton.addEventListener('click', function (event) {
    //toggles email input
    if (emailToggle.style.display === 'none') {
        emailToggle.style.display = 'block';
        submit.textContent = 'sign up';
        signUpButton.textContent = 'login';
        haveAccount.textContent = 'Already have an account?';
    } else {
        emailToggle.style.display = 'none';
        submit.textContent = 'login';
        signUpButton.textContent = 'sign up';
        haveAccount.textContent = 'Don\'t have an account?';
    }
});