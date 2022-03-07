var score = 0;
var correctAnswers = 0;
var quiz = [
    {
        question: "Commonly used data types DO Not Include:",
        answer1: "strings",
        answer2: "booleans",
        answer3: "alerts",
        answer4: "numbers",
        correctAnswer: "alerts",

    },
    {
        question: "The condition if an if / else statement is enclosed with _________.",
        answer1: "quotes",
        answer2: "curly brackets",
        answer3: "parenthesis",
        answer4: "square brackets",
        correctAnswer: "parenthesis",

    },
    {
        question: "Removes the first element of an array and returns that element is ________.",
        answer1: "shift()",
        answer2: "Function",
        answer3: "push()",
        answer4: "Dynamic Typing",
        correctAnswer: "shift()",

    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is?",
        answer1: "Javascript",
        answer2: "terminal/bash",
        answer3: "for loops",
        answer4: "console.log()",
        correctAnswer: "console.log()",

    },
    {
        question: "Repeats until a specific condition becomes false:",
        answer1: "For Loop",
        answer2: "Do While Loop",
        answer3: "Variables",
        answer4: "None of the Above",
        correctAnswer: "For Loop",

    },

];

var timerEl = document.querySelector("#timer");
var pageContentEl = document.querySelector(".page-content");
var startQuizBtnEl = document.querySelector("#start-quiz");
var pageTitleEl = document.querySelector(".page-title");
var introMessageEl = document.querySelector(".page-content p");
var buttonsWraprEl = document.querySelector(".btn-wrapper");
var scoreEl = document.querySelector("#timer");
var submitFormBtnEl = document.querySelector("#submit-form-btn");
var answerMessageEl = document.querySelector(".answer-msg");

var startQuizHandler = function () {
    score = 75;
    timerEl.textContent = score;
    pageContentEl.style.alignItems = "flex-start";
    startQuizBtnEl.remove();
    introMessageEl.remove();

    countDown();
    displayQuestion();
};


var quizHandler = function (event) {
    document.querySelector(".answer-wrapper").classList.remove("hide");
    var targetEl = event.target;
    var answer = targetEl.innerHTML;
    answer = answer.replace(/<span>\d. <\/span>/, "");

    if (answer === quiz[0].correctAnswer) {
        answerMessageEl.setAttribute("style", "color: blue ");
        answerMessageEl.textContent = "Correct Answer! Nice Job!";
        correctAnswers++;
        clearAnswerValidationMsg();
    } else if (answer != quiz[0].correctAnswer) {
        answerMessageEl.setAttribute("style", "color: red");
        answerMessageEl.textContent = "Incorrect! Better Luck on the next one!";
        score = score - 15;
        clearAnswerValidationMsg();
        scoreEl.textContent = score;
    }

    quiz.shift();
    if (quiz.length > 0 && score > 0) {
        displayQuestion();
    }
    else if (quiz.length === 0 || score === 0) {

        displayDonePage();
    }
};

var submitScoreFormHandler = function () {
    pageRedirect();
};

function countDown() {
    var timeInterval = setInterval(function () {

        if (score >= 1 && quiz.length >= 1) {
            timerEl.textContent = score;
            score--;
            console.error(quiz.length);
        }
        else {
            clearInterval(timeInterval);
            displayDonePage();
        }
    }, 1000);
}

function displayQuestion() {
    var buttonElChildElementsCount = document.querySelector(".btn-wrapper")
        .childElementCount;
    if (buttonElChildElementsCount > 0) {
        document.querySelector(".btn-wrapper").innerHTML = "";
    }
    var index = 0;

    for (var key in quiz[0]) {
        if (/^answer/.test(key)) {
            var newSpanEl = document.createElement("span");
            newSpanEl.innerText = `${index}. `;

            var answerBtnEl = document.createElement("button");
            answerBtnEl.setAttribute("class", "btn left-aligned");
            answerBtnEl.innerHTML = `<span>${index}. </span>${quiz[0][key]}`;
            pageTitleEl.textContent = quiz[0].question;

            buttonsWraprEl.appendChild(answerBtnEl);
        }
        index++;
    }
    return;
}

function clearAnswerValidationMsg() {
    setTimeout(function () {
        document.querySelector(".answer-wrapper").classList.add("hide");
    }, 2000);
}

function displayDonePage() {
    pageTitleEl.textContent = "FINISHED!";
    buttonsWraprEl.remove();
    document.querySelector(".timer-wrapper").classList.add("hide");

    var initialsFormWrapperEl = document.querySelector(".initials-form-wrapper");
    initialsFormWrapperEl.classList.remove("hide");

    var finalScoreEl = document.querySelector(".initials-form-wrapper p");

    if (correctAnswers === 0 || score <= 0) {
        score = 0;
        finalScoreEl.textContent = `You got none of them correct, thus your final score is: ${score}.`;
        return;
    } else finalScoreEl.textContent = `Your final score is ${score}. Good Job!`;
    return;
}

function pageRedirect() {
    var initials = document.querySelector("#initials").value;
    if (initials) {
        saveScoreInLocalStorage();
        window.location.href = "highscore.html?";
    } else {
        alert("Please type in initials");
    }
}

function saveScoreInLocalStorage() {
    var initials = document.querySelector("#initials").value.trim().toUpperCase();
    var scoresArray = JSON.parse(localStorage.getItem("highScores")) || [];

    if (scoresArray.length != 0) {
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i].initials === initials) {
                window.alert(
                    "Looks like you already have a score with those initials, we can update that score for ya."
                );
                var existingUserRecord = parseInt(scoresArray[i].score);
                if (existingUserRecord < score) {
                    scoresArray.splice(i, 1);
                    var highScore = {
                        initials: initials,
                        score: score,
                    };
                    break;
                } else return;
            } else if (scoresArray[i].initials != initials) {
                var highScore = {
                    initials: initials,
                    score: score,
                };
            }
        }
        scoresArray.push(highScore);
        localStorage.setItem("highScores", JSON.stringify(scoresArray));
        return;
        //if new user then create and push the score object to the array
    } else {
        var highScore = {
            initials: initials,
            score: score,
        };
        scoresArray.push(highScore);
        localStorage.setItem("highScores", JSON.stringify(scoresArray));
    }
}

startQuizBtnEl.addEventListener("click", startQuizHandler);
buttonsWraprEl.addEventListener("click", quizHandler);
submitFormBtnEl.addEventListener("click", submitScoreFormHandler);