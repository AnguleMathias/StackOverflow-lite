/*-------------------------------------------

post Answer to question

----------------------------------------------*/
const postAnswer = () => {
    const answer = document.getElementById('answer').value;
    const inputData = {
        answer,
    };
    const qstn_id = localStorage.getItem('qstn_id');

    fetch('http://127.0.0.1:5000/api/v1/questions/' + qstn_id + '/answers',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify(inputData),
        })
        .then(response => response.json())
        .then((data) => {
            if (data.message !== 'success') {
                showAlert(data.message);
            }
            if (data.message === 'success') {
                window.location.reload();
                showAlert('Answer posted successfully');
            }
        })
        .catch(error => showAlert(error));
};

document.getElementById('answer_form').addEventListener('submit', postAnswer);
