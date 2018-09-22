/*------------------------------------------------

Post a question

--------------------------------------------------*/
const post = (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const question = document.getElementById('question').value;

    const inputData = {
        title,
        question,
    };

    fetch('http://127.0.0.1:5000/api/v1/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(inputData),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.message !== 'Question posted successfully') {
                showAlert(data.message);
            }
            if (data.message === 'Question posted successfully') {
                window.location.replace('my-questions.html');
                showAlert('Question posted successfully');
            }
        })
        .catch(error => showAlert(error));
};
document.getElementById('post_form').addEventListener('submit', post);
