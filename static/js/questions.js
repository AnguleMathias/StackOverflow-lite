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
                const split = questions[counter]['date'].split(',')[1];
                const split1 = split.split(' ');
                const day = split1[1];
                const month = split1[2];
                const year = split1[3];

                output += `<div class="question-row">
                                <div class="question-summaries padding-16">
                                    <a onclick="setOneQuestion(${qstn_id})" class="question"> ${question}</a>
                                    <a href="#" class="tag">tag 1</a> <a href="#" class="tag">tag 2</a>
                                    <span class="float-right"><i>Posted by <span class="text-primary"> ${qstn_owner}
                                    </span></i> on <span class="text-primary"> ${day}-${month}-${year}</span></span>
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

store qstn id in localStorage for all questions

--------------------------------------------------*/
const setOneQuestion = (qstn_id) => {
    localStorage.setItem('qstn_id', qstn_id);
    window.location.replace('templates/answer.html');
};
/*--------------------------------------------

View specific user questions

----------------------------------------------*/

const getUserQuestions = () => {
    fetch('http://127.0.0.1:5000/api/v1/questions/user_questions', {

        method: 'GET',

        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data.message)
            const questions = data.questions;
            let output = '';
            for (let counter = 0; counter < questions.length; counter++) {
                const question = questions[counter]['question'];
                const qstn_id = questions[counter]['qstn_id'];
                const qstn_owner = questions[counter]['qstn_owner'];
                const split = questions[counter]['date'].split(',')[1];
                const split1 = split.split(' ');
                const day = split1[1];
                const month = split1[2];
                const year = split1[3];

                output += `<div class="question-row">
                                <div class="question-summaries padding-16">
                                    <a onclick="setOneUserQuestion(${qstn_id})" class="question"> ${question}</a>
                                    <a href="#" class="tag">tag 1</a> <a href="#" class="tag">tag 2</a>
                                    <a href="" class="btn btn-red small rounded" onclick="return confirm('Are you sure you want to delete this question?')">Delete</a>
                                    <span class="float-right"><i>Posted on</i><span class="text-primary"> ${day}-${month}-${year}</span></span>
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
            document.getElementById('user_questions').innerHTML = output;
        })
        .catch(error => showAlert(error));
};

/*------------------------------------------------

store qstn id in localStorage for my questions

--------------------------------------------------*/

const setOneUserQuestion = (qstn_id) => {
    localStorage.setItem('qstn_id', qstn_id);
    window.location.replace('answer.html');
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
