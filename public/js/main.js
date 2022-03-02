const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/api/users/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            location.replace('/');
        });
});