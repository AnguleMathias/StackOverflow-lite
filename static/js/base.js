/*-------------------------------------------

Alert function

----------------------------------------------*/
const showAlert = (msg) => {
    const alertDiv = document.getElementById('alert-msg');
    alertDiv.style.display = 'block';
    alertDiv.innerHTML = msg;
};

/*-------------------------------------------

logout fnction

----------------------------------------------*/
const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    window.location.replace('../index.html');
}
