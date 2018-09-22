/*--------------------------------------------

Register new user

----------------------------------------------*/
const register = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const inputData = {
        username,
        email,
        password,
    };

    fetch('http://127.0.0.1:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(inputData),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.message === 'New User Created') {
                showAlert('New User Created');
                window.location.replace('login.html');
            }
            if (data.message) {
                showAlert(data.message);
            }
        })
        .catch(error => showAlert(error));
};

/*---------------------------------------------------

Login user

----------------------------------------------------*/
const login = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const inputData = {
        username,
        password,
    };

    fetch('http://127.0.0.1:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(inputData),
    })

        .then(response => response.json())
        .then((data) => {
            if (data.message === 'Successful login') {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('username', data.username);
                window.location.replace('my-questions.html');
            }
            if (data.message) {
                showAlert(data.message);
            }
        })
        .catch(error => showAlert(error));
};

document.getElementById('login_form').addEventListener('submit', login);
