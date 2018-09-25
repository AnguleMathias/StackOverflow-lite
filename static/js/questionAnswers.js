/*--------------------------------------------

Get a specific question with all its answers

---------------------------------------------*/
const getOneQuestion = () => {
    const qstn_id = localStorage.getItem('qstn_id');
    if (qstn_id === null) {
        showAlert('Sorry, a problem occurred. Try reloading the page');
    } else {
        fetch(`http://127.0.0.1:5000/api/v1/questions/${qstn_id}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                },
            })
            .then(response => response.json())
            .then((data) => {
                if (data.message !== 'success') {
                    showAlert(data.message);
                } else if (data.message === 'success') {
                    const split = data['Question Details'].date.split(',')[1];
                    const split1 = split.split(' ');
                    const day = split1[1];
                    const month = split1[2];
                    const year = split1[3];
                    const output = `<div class="heading"><h3 class="heading-25">${data['Question Details'].title}</h3>
                                <div class="clear"></div></div><div class="divider"></div><div class="heading"><div>
                                <p>${data['Question Details'].question}</p>
                                <a href="#" class="tag">tag 1</a> <a href="#" class="tag">tag 2</a>
                                <span class="float-right"><i>Posted by <span class="text-primary"> ${data['Question Details'].qstn_owner}
                                </span></i> on <span class="text-primary"> ${day}-${month}-${year}</span></span>`;

                    document.getElementById('question_selected').innerHTML = output;
                }
                let answers = '';
                if (data.Answers) {
                    data.Answers.forEach((element) => {
                        const split = element.date.split(',')[1];
                        const split1 = split.split(' ');
                        const day = split1[1];
                        const month = split1[2];
                        const year = split1[3];
                        answers += `<div class="numbers small"><div>2</div> <div class="img-accept">
                                <img src="../static/images/tick.jpg" class="img-responsive"> </div> </div>
                                <div class="question-summaries large"> <p>${element.answer}</p> 
                                <span class="float-right"><i>Answer by <span class="text-primary"> ${element.ans_owner}
                                </span></i> on <span class="text-primary"> ${day}-${month}-${year}</span></span></div> </div>
                                <div class="clear divider"></div> <div class="clear"></div>`;
                    });
                    document.getElementById('ans_to_qst').innerHTML = answers;
                }
            })
            .catch(error => showAlert(error));
    }
};

window.onload = getOneQuestion();

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
                const split = questions[counter]['date'].split(',')[1];
                const split1 = split.split(' ');
                const day = split1[1];
                const month = split1[2];
                const year = split1[3];

                output += `<div class="question-row">
                                <div class="question-summaries padding-16">
                                    <a onclick="setOneUserQuestion(${qstn_id})" class="question"> ${question}</a>
                                    <a href="#" class="tag">tag 1</a> <a href="#" class="tag">tag 2</a>
                                    <a href="" class="btn btn-red small rounded" onclick="deleteQuestion(${qstn_id})">Delete</a>
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

/*----------------------------------------------

Delete question

------------------------------------------------*/

const deleteQuestion = () => {
    let qstn_id = localStorage.getItem('qstn_id');
    if (qstn_id === null) {
        showAlert('Sorry, a problem occurred. Try reloading the page');
    } else {
        fetch(`http://127.0.0.1:5000/api/v1/questions/${qstn_id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("access_token"),
            },
        })

            .then(response => response.json())
            .then((data) => {
                if (data.message === 'Question successfully deleted') {
                    window.location.reload();
                    showAlert('Question successfully deleted');
                } else {
                    showAlert(data.message);
                }
            })
            .catch(error => showAlert(error));
    }
};
