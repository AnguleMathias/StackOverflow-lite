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
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
            })
            .then(response => response.json())
            .then((data) => {
                if (data.message !== 'success') {
                    showAlert(data.message);
                } else if (data.message === 'success') {
                    const output = `<div class="heading">
                    <h3 class="heading-25">${data['Question Details'].title}</h3>
                    <div class="clear"></div>
                </div>
                <div class="divider"></div>
                <div class="heading">
                    <div>
                        <p>${data['Question Details'].question}</p>
                        <a href="#" class="tag">tag 1</a>
                        <a href="#" class="tag">tag 2</a>
                        <span class="float-right"><i>Posted by <span class="text-primary"> ${data['Question Details'].qstn_owner}
                        <div class="clear margin-30"></div>
                        <div class="divider"></div>

                        <div class="clear margin-30"></div>
                        <h3 class="heading-20">
                            2 Answers
                        </h3>
                        <div class="divider"></div>`;

                    document.getElementById('question_selected').innerHTML = output;
                }

                let answers = '';
                if (data.Answers) {
                    data.Answers.forEach((element) => {
                        answers += `<div class="question-row">
                        <div class="numbers small">
                            <div>2</div>
                            <div class="img-accept">
                                <img src="../static/images/tick.jpg" class="img-responsive">
                            </div>
                        </div>

                        <div class="question-summaries large">

                            <p>
                            ${element.answer}
                            </p>
                        </div>

                    </div>
                    <div class="clear divider"></div>
                    
                    <div class="clear"></div>


                </div>`;
                    });
                    document.getElementById('ans_to_qst').innerHTML = answers;
                }
            })
            .catch(error => showAlert(error));
    }
};

window.onload = getOneQuestion();
