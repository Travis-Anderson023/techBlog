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

submit.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let email = document.getElementById('email').value;

        //login
        if (emailToggle.style.display === 'none') {

            //fetch to login api
            const data = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if (data.status === 201) {
                window.location.href = '/';
            } else {
                alert(data.message);
            }
            //signup
        } else {
            console.log('do sign up');
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 201) {
                        window.location.href = '/';
                    } else {
                        console.log(data);
                    }
                }
                );
        }
    } catch (err) {
        console.log(err);
    }
});
