// global variables
var questions; // objects containing the quiz questions
var count, score, scorePercentage, answer; // tracking variables
var correctAnswer, prevFlag; // flags
var choices, question, resultsPara, choicesPara; // elements being updated
var resetButton, prevButton; // buttons
var progress, progressPercentage; // progress bar

questions = [
    {
        number: 0,
        question: 'Who is the CEO of Emperor J tv',
        choices: ['Jack Chulo', ' Myra Hindley', 'Adepoju Ifeoluwa', 'Opara Jeremiah'],
        answer: 2
    },
    {
        number: 1,
        question: 'When was Emperor J enterprises founded?',
        choices: ['2009','2019','2022','2026' ],
        answer: 1
    },
    {
        number: 2,
        question: 'What is Emperor J networth?',
        choices: ['$1b', '$16b', '$15t', '$199b'],
        answer: 3
    },
    {
        number: 3,
        question: 'Who is the founder of the girl movement',
        choices: [''],
        answer: 0
    },
    {
        number: 4,
        question: 'How many people did Ed Gein kill?',
        choices: ['10', '25', '2', '6'],
        answer: 2
    },
    {
        number: 5,
        question: 'How many was Ed Gein convicted for?',
        choices: ['0', '1', '10', '16'],
        answer: 1
    },
    {
        number: 6,
        question: 'What was Brenda Spencer\'s reason for her killing spree at Cleveland Elementary School?',
        choices: ['She didn\'t like Mondays', 'She was being bullied', 'She wanted to see what killing was like', 'She hated kids'],
        answer: 0
    },
    {
        number: 7,
        question: 'What does Dennis Rader\'s nickname, "BTK", stand for?',
        choices: ['Bind, Torture, Kill', 'Blindfold, Tickle, Kill', 'Bind, Tickle, Kill', 'Blindfold, Torture, Kill'],
        answer: 0
    },
    {
        number: 8,
        question: 'What was Sacramento serial killer Richard Chase\'s nickname?',
        choices: ['The Night Stalker', 'The Vampire of Sacramento', 'The East Area Rapist', 'The Zodiac Killer'],
        answer: 1
    },
    {
        number: 9,
        question: 'Which woman was thought to be the first serial killer?',
        choices: ['Aileen Wuornos', 'Belle Gunness', 'Jane Toppan', 'Lavinia Fisher'],
        answer: 3
    },
    {
        number: 10,
        question: 'What book was the torn page from that was found with the Somerton Man?',
        choices: ['The Rudaiyat of Omar Khayyan', 'The Bible', 'The Great Gatsby', 'The Quaran'],
        answer: 0
    },
    {
        number: 11,
        question: 'How many years was Jaycee LeeDugard held against her own will?',
        choices: ['1 year', '8 years', '25 years', '3 years'],
        answer: 1
    },
    {
        number: 12,
        question: 'What disorder did the Eriksson Twins suffer from?',
        choices: ['Bipolar', 'Schizophrenia', 'Depression', 'Folie a deux'],
        answer: 3
    },
    {
        number: 13,
        question: 'What country was the infamous "Who put Bella in the wych-elm" body found?',
        choices: ['England', 'Ireland', 'Scotland', 'Poland'],
        answer: 1
    },
    {
        number: 14,
        question: 'What was John Wayne Gacy known as?',
        choices: ['The Killer Clown', 'The Midwest Killer', 'The Hillside Strangler', 'The Candyman'],
        answer: 0
    },
    {
        number: 15,
        question: 'Who was Leonard Lake\'s partner in crime?',
        choices: ['Dean Corll', 'Charles Ng', 'David Burkowitz', 'Ottis Toole'],
        answer: 1
    },
    {
        number: 16,
        question: 'What country did Andrei Chikatilo hail from?',
        choices: ['England', 'Japan', 'America', 'Russia'],
        answer: 3
    },
    {
        number: 17,
        question: 'What state was The Green River Killer active in?',
        choices: ['Ohio', 'New York', 'California', 'Washington'],
        answer: 3
    },
    {
        number: 18,
        question: 'Who was known to be Jack the Ripper\'s last victim?',
        choices: ['Martha Tabram', 'Catherine Eddowes', 'Mary Ann Nichols', 'Mary Kelly'],
        answer: 3
    },
    {
        number: 19,
        question: 'What was the movie The Zodiac Killer referred to as the best satirical comedy?',
        choices: ['The Exorcist', 'Halloween', 'Jaws', 'Amityville Horror'],
        answer: 0
    }
];



// set tracking variables
count = 0;
score = 0;
correctAnswer = false;
prevFlag = false;



// grab html elements
choices = document.querySelectorAll('.choices');
question = document.getElementsByTagName('h2')[0];
resultsPara = document.getElementsByTagName('p')[0];
choicesPara = document.getElementsByTagName('p')[1];

resetButton = document.getElementsByClassName('reset')[0];
prevButton = document.getElementsByClassName('prev')[0];
progress = document.getElementsByClassName('progress-bar')[0];



// add the event listeners
window.onload = renderQuestion();

prevButton.addEventListener('click', prevQuestion);
resetButton.addEventListener('click', resetQuiz);
choices.forEach(function(choice) {
    choice.addEventListener('click', scoring);
});



// functions used
function scoring() {
    // grab the answer of the current question
    answer = questions[count].answer;
    // prevButton is visible when a choice is selected
    prevFlag = true;
    
    // THIS is the span.choice that the user clicked
    if (this.innerText === questions[count].choices[answer]) {
        // correctAnswer waves for prevButton use
        correctAnswer = true;
        score++;
    } else {
        correctAnswer = false;
    }
    
    // then render next question
    nextQuestion();
}



function nextQuestion() {
    // count goes up
    count++;
    
    if (count > 20) {
        count = 20;
    } else if (count !== 20) {
        // numbers between 0 and 20 have questions that can be rendered
        renderQuestion();
    } else if (count === 20) {
        // quiz is over when count reaches 20
        renderCompletion();
    }
}



// the prevButton will only be available to go back one question
function prevQuestion() {
    // when the previous question renders, remove the prevButton
    prevFlag = false;
    
    // if the user originally clicked the correctAnswer, remove score
    if (correctAnswer) {
        correctAnswer = false;
        score--;
    }
    
    // then go back and render the old question
    count--;
    renderQuestion();
}




function renderQuestion() {
    
    // prevButton is hidden on the first page
    // and if the user attempts to go back more than one question
    if (!prevFlag) {
        prevButton.classList.add('hide');
    } else if (prevButton.classList.contains('hide')) {
        prevButton.classList.remove('hide');
    }
    
    // update question div with current question
    question.innerText = questions[count].question;
    
    // update each choice with the choices available in current question
    choices.forEach(function(choice, i) {
        choice.innerText = questions[count].choices[i];
    });
    
    updateProgress();
}

function renderCompletion() {
    updateProgress();
    scorePercentage ='$' + Math.round(score/20 * 2000) ;
    
    // update with a thank you note and the user's percentage
    question.innerText = 'Thank you for Completing the Quiz!';
    resultsPara.innerText = 'Your total amount won is: ' + scorePercentage;
    
    // reset avail, prevButton and choicesPara are removed
    choicesPara.classList.add('hide');
    prevButton.classList.add('hide');
    resetButton.classList.remove('hide');
}



function updateProgress() {
    // progress bar will be updated as count goes up
    progressPercentage = Math.round((count/20) * 100);
    progress.style.width = progressPercentage + '%';
}


function resetQuiz() {
    // reset tracking variables
    count = 0;
    score = 0;
    correctAnswer = false;
    prevFlag = false;
    
    // resultsPara is hidden
    resultsPara.innerText = '';
    
    // choicesPara displays while resetButton is hidden
    choicesPara.classList.remove('hide');
    resetButton.classList.add('hide');
    
    renderQuestion();
}