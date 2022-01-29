var response = {
    statusCode: 201,
    body: {
        title: `eCommerce Quiz`,
        quizdata: {
            "Which of the following is not a real eCommerce platform?": [
                `Shopify`,
                `WooCommerce`,
                `ShopCommerce`,
                `BigCommerce`,
            ],
            "If Shopify is so good, why are Shopify developers necessary?": [
                `To save time on things like store setups and migrations`,
                `To extend the limited design options and functionalities of themes with custom code`,
                `To provide support with a deep understanding of how the platform works and what its limitations are`,
                `All the above`,

            ],
            "Which of the following is true about Shopify developers?": [
                `They are paid extremely well`,
                `There is a high demand for them`,
                `They need to know web development, the platform itself, and the liquid template language`,
                `All the above`,
            ]
        },
        correctAnswers : [
            `ShopCommerce`,
            `All the above`,
            `All the above`,
        ],
    }
}

var container = document.querySelector('.container');
var h1 = document.querySelector("h1");
var form = document.querySelector("form");
var questionCount = document.querySelector(".question-count");
var nextButton = document.querySelector(".next");
var backButton = document.querySelector(".back");
var submitButton = document.querySelector(".submit");
var question = document.querySelector(".question");
var labels = document.getElementsByTagName("label");
var scoreBoard = document.querySelector('.score-board')
var h2 = document.querySelector('.score');
var displayMsg = document.querySelector('.message');

var userAnswers;
var score = 0;

var questionObject = response.body.quizdata;
var noOfQuestions = Object.keys(questionObject).length;

var questions = [];
for (var q in questionObject) {
    questions.push(q);
};
var currentQuestionIndex = 0;
var currentQuestion = questions[currentQuestionIndex];

h1.innerText = response.body.title;

questionCount.innerText = `
    Question ${currentQuestionIndex+1} of ${noOfQuestions}
`;

question.innerText = currentQuestion;

// create labels and input type radio elements and set attributes for them 
var i = 0;
for (var key in questionObject) {
    var divAnswers = document.createElement('div');
    divAnswers.setAttribute('class', `question-${i+1}`);
    divAnswers.classList.add('invisible');
    form.appendChild(divAnswers);
    for (var index = 0; index < questionObject[key].length; index++) {
      var labelRadioDiv = document.createElement('div');
      labelRadioDiv.classList.add(`radio-div`);
      var labelDiv = document.createElement('div');
      labelDiv.classList.add('label-div');
      var label = document.createElement('label');
      label.setAttribute('for', `option-${index+1}`);
      label.innerText = questionObject[key][index];
      var radioButton = document.createElement('input');
      radioButton.setAttribute('type', 'radio');
      radioButton.setAttribute('id', `option-${index+1}`);
      radioButton.setAttribute('name', `${key}`);
      radioButton.setAttribute('value', `${questionObject[key][index]}`);
    
      labelDiv.appendChild(label);

      labelRadioDiv.appendChild(radioButton);
      labelRadioDiv.appendChild(labelDiv);
      
      divAnswers.appendChild(labelRadioDiv);
    };
    i ++;
};

var currentDisplayedQuestion = document.querySelector(`.question-${currentQuestionIndex+1}`);

currentDisplayedQuestion.classList.remove('invisible');
currentDisplayedQuestion.classList.add('active');

function buttonFunction(e) {
    currentOptions = document.getElementsByName(currentQuestion);
    userAnswers = document.querySelectorAll("input[type='radio']:checked");

    if (e.currentTarget.classList[0] == 'next' && currentQuestionIndex <= 1) {
        currentQuestionIndex++;
    };
    if (e.currentTarget.classList[0] == 'back' && currentQuestionIndex >= 1) {
        currentQuestionIndex--;
    };
    
    if (currentQuestionIndex === 2) {
        nextButton.classList.add("invisible");
        submitButton.classList.remove("invisible");
    } else if (currentQuestionIndex === 0) {
        backButton.classList.add("invisible");
    } else {        
        backButton.classList.remove("invisible");
        nextButton.classList.remove("invisible");
        
        submitButton.classList.add("invisible");
    };

    currentQuestion = questions[currentQuestionIndex];

    questionCount.innerText = `
    Question ${currentQuestionIndex+1} of ${noOfQuestions}
    `;

    question.innerText = currentQuestion;

    for (var questionNo=0; questionNo < noOfQuestions; questionNo++) {
        var q = document.querySelector(`.question-${questionNo+1}`);
        q.classList.add('invisible');
        q.classList.remove('active');

    };

    currentDisplayedQuestion = document.querySelector(`.question-${currentQuestionIndex+1}`);
    currentDisplayedQuestion.classList.remove('invisible');
    currentDisplayedQuestion.classList.add('active');

};

nextButton.addEventListener('click', buttonFunction);
backButton.addEventListener('click', buttonFunction);

i = 0;

submitButton.addEventListener('click', function() {
    userAnswers = document.querySelectorAll("input[type='radio']:checked");
    if (userAnswers.length < noOfQuestions) {
        alert("Please answer all the questions");
        return
    };

    container.style.display = 'none';
    scoreBoard.classList.remove('invisible');

    for (var ansIndex=0; ansIndex<noOfQuestions; ansIndex++) {
        if (userAnswers[ansIndex].getAttribute('value') === response.body.correctAnswers[ansIndex]) {
            score++;
        };
    };
    
    h2.innerText = `SCORE: ${score}`;
    if (score === noOfQuestions) {
        displayMsg.innerHTML = `<span>Great!</span> You are now ready to do Freelancing!`;
    } else {
        displayMsg.innerHTML = `<span>Don't worry you got this!</span> Use <a href="google.com">Google</a>, <a href="youtube.com">See videos</a> and you may use the chat channel also!`;
    };
});
