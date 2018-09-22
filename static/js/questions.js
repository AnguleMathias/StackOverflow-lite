/*--------------------------------------------

View all questions

----------------------------------------------*/

const getQuestions = () => {
    fetch('http://127.0.0.1:5000/api/v1/questions', {

        method: 'GET',

        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
    })
        .then(response => response.json())
        .then((data) => {
            const questions = data.questions;
            let output = '';
            for (let counter = 0; counter < questions.length; counter++) {
                const question = questions[counter]['question'];
                const qstn_id = questions[counter]['qstn_id'];
                const qstn_owner = questions[counter]['qstn_owner'];

                output += `<div class="question-row">
                                <div class="question-summaries padding-16">
                                    <a onclick="setOneQuestion(${qstn_id})" class="question"> ${question}</a>
                                    <a href="#" class="tag">tag 1</a> <a href="#" class="tag">tag 2</a>
                                    <span class="float-right"><i>Posted by <span class="text-primary"> ${qstn_owner}
                                    </span></i> on </span>
                                </div>
                                <div class="numbers">
                                    <div class="number-slot"><label>2</label><label>votes</label></div>
                                    <div class="number-slot"><label>4</label><label>answers</label></div>
                                    <div class="number-slot"><label>13</label><label>views</label></div>
                                </div>
                                <div class="clear"></div>
                            </div>
                                <div class="clear"></div><div class="divider light"></div>`;
            }
            document.getElementById('elements').innerHTML = output;
        })
        .catch(error => showAlert(error));
};

/*------------------------------------------------

store qstn id in localStorage

--------------------------------------------------*/

const setOneQuestion = (qstn_id) => {
    localStorage.setItem('qstn_id', qstn_id);
    window.location.replace('templates/answer.html');
};

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
