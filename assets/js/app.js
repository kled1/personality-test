
var userPersonality = 0;
var quizActive = true;

var userStats = [
    0,
    0 
];

var tempStats = userStats; 

// questions texts
var questionText = [
    "You’re really busy at work and a colleague is telling you their life story and personal woes. You:",
    "You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:",
    "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:",
    "You are taking part in a guided tour of a museum. You:",
];
// ansers text for each question
var answerText = [														
    [
        "Don’t dare to interrupt them",
        "Think it’s more important to give them some of your time; work can wait",
        "Listen, but with only with half an ear",
        "Interrupt and explain that you are really busy at the moment",
    ],
    [
        "Look at your watch every two minutes",
        "Bubble with inner anger, but keep quiet",
        "Explain to other equally impatient people in the room that the doctor is always running late",
        "Complain in a loud voice, while tapping your foot impatiently",
    ],
    [
        "Don’t dare contradict them",
        "Think that they are obviously right",
        "Defend your own point of view, tooth and nail",
        "Continuously interrupt your colleague",
    ],
    [
        "Are a bit too far towards the back so don’t really hear what the guide is saying",
        "Follow the group without question",
        "Make sure that everyone is able to hear properly",
        "Are right up the front, adding your own comments in a loud voice",
    ],
]
// answers values for each question
var answerValues = [
    [
        [3, 0, 1, 0],
        [0, 0, 0, 1],
        [0, 3, 0, 2],
        [0, 2, 0, 3]
    ],
    [
        [0, 3, 0, 2,],
        [2, 0, 0, 0,],
        [0, 2, 0, 0,],
        [2, 0, 3, 1,]
    ],
    [
        [0, 1, 0, 0],
        [3, 0, 2, 0],
        [1, 0, 3, 0],
        [0, 3, 0, 1]
    ],
    [
        [2, 0, 3, 0],
        [0, 1, 0, 3],
        [0, 3, 2, 0],
        [0, 0, 0, 2]
    ],

]

var results = document.getElementById("results");
var quiz = document.getElementById("quiz");
var body = document.body.style;
var printResult = document.getElementById("topScore");
var buttonElement = document.getElementById("button");

/* QUIZ FUNCTIONALITY */

buttonElement.addEventListener("click", changeState);

function changeState() {

    updatePersonalityPoints(); 
    // checks if the quiz is finished
    if (quizActive) {
        initText(userPersonality);	
        userPersonality++;			
        buttonElement.disabled = true;
        buttonElement.innerHTML = "Please select an answer";
        buttonElement.style.opacity = 0.7;
    } else {
        setPersonalityPage();
    }
}
// funcion adds data to the questions
function initText(question) {

    var answerSelection = "";

    /* Creates radio buttons based on user progress through the quiz - current 'id' generation is not w3c compliant*/

    for (i = 0; i < answerText[question].length; i++) {

        answerSelection += "<li><input type='radio' name='question" +
            (question + 1) + "' onClick='setAnswer(" + i + ")' id='" + answerText[question][i] + "'><label for='" + answerText[question][i] + "'>" + answerText[question][i] + "</label></li>";
    }

    document.getElementById("questions").innerHTML = questionText[question];	//set question text
    document.getElementById("answers").innerHTML = answerSelection;				//set answer text
}

// when an asnwer is selected

function setAnswer(input) {

    clearTempStats();

    tempStats = answerValues[userPersonality - 1][input];
    // checks if the quiz is finished
    if (userPersonality < questionText.length) {
        buttonElement.innerHTML = "Continue";
        buttonElement.disabled = false;
        buttonElement.style.opacity = 1;

    } else {
        quizActive = false;
        buttonElement.innerHTML = "Display your custom website"
        buttonElement.disabled = false;
        buttonElement.style.opacity = 1;
    }
}

// empty data to clear stats

function clearTempStats() {

    tempStats = [0, 0, 0, 0, 0, 0];
}

// add data when user selects answer
function updatePersonalityPoints() {

    for (i = 0; i < userStats.length; i++) {
        userStats[i] += tempStats[i];
    }
}
// sets the results page
function setPersonalityPage() {

    var highestStatPosition = 0;

    for (i = 1; i < userStats.length; i++) {

        if (userStats[i] > userStats[highestStatPosition]) {
            highestStatPosition = i;
        }
    }
    // adds points and hides the quiz div 
    displayPersonalityPage(highestStatPosition);
    quiz.style.display = "none";
}

// shows result page based on user selection
function displayPersonalityPage(personality) {
    switch (personality) {

        case 0:	//Introvert
            results.style.display = "inline-block";
            results.classList.add("introvert");
            body.background = "blue";
            body.backgroundRepeat = "repeat";
            printResult.innerText = "Introvert";
            break;

        case 1: //Extrovert
            results.style.display = "inline-block";
            results.classList.add("extrovert");
            body.background = "red";
            body.backgroundRepeat = "repeat";
            printResult.innerText = "Extrovert";
            break;

        default:
            document.getElementById("error").style.display = "inline-block";

    }
}