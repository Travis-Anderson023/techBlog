submit.addEventListener('click', async (event) => {
    event.preventDefault();

    const title = document.getElementById('new-title').value;
    const body = document.getElementById('new-body').value;
    const userId = document.getElementById('userId').getAttribute('data');
    const submit = document.getElementById('submit');

    console.log(title);
    //create new post
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
        })
    });
});

