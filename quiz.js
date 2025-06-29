// For quiz
let quizLink = 'https://raw.githubusercontent.com/Abrar822/Exoplanets-Facts/refs/heads/main/mcqs.json';
let quizBtn = document.querySelectorAll('.quizBtn');
let hero = document.querySelector('.hero');
let left = document.querySelector('.left');
let rights = document.querySelector('.right');
let quizContainer = document.querySelector('.quiz-container');

// For quiz button
quizBtn.forEach((btn)=> {
    btn.addEventListener('click', (event) => {
        // For hiding the rest sections
        for(let section of sections) {
            if(getComputedStyle(section).display === 'flex' && !section.classList.contains('quiz-container')) {
                section.style.top = '1000px';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 70)
                // specific to explore-exos
                if(section.classList.contains('explore-exos-container')) {
                    exoSearchBar.style.display = 'flex';
                    exoButtons.style.display = 'flex';
                }
            }
        }
        setTimeout(() => {
            quizContainer.style.display = 'flex';
        }, 100);
        setTimeout(() => {
            quizContainer.style.top = '80px';
        }, 300);
    });
});

// For homeBtn
let homeBtn = document.querySelectorAll('.homeBtn');
homeBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        for(let section of sections) {
            if(getComputedStyle(section).display === 'flex' && !section.classList.contains('hero')) {
                section.style.top = '1000px';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 70)
                // specific to explore-exos
                if(section.classList.contains('explore-exos-container')) {
                    exoSearchBar.style.display = 'flex';
                    exoButtons.style.display = 'flex';
                }
            }
        }
        setTimeout(() => {
            hero.style.display = 'flex';
        }, 100);
        setTimeout(() => {
            hero.style.top = '0px';
        }, 300);
    });
});

// For start quiz button
let initialContent = document.querySelector('.initial-content');
let startQuiz = document.querySelector('.start');
let titlebar = document.querySelector('.titlebar');
let content = document.querySelector('.content');
let myQuestion = document.querySelector('.ques');
let qNo = document.querySelector('.qNo');
let options = document.querySelector('.options');

// variables
let count = 0, score = 0;
let myMcqs = [];
let myOptions = [];
let correctAnswer;

// function to get the questions and store in allMcqs[]
async function getQuiz() {
    let response = await fetch(quizLink);
    let data = await response.json();
    // For storing all the mcqs
    let allMcqs = data.questions;
    // For randomly storing my 10 mcqs
    for(let i = 0; i < 10; i++) {
        let idx = Math.floor(Math.random() * allMcqs.length);
        myMcqs[i] = allMcqs[idx];
    }
}

// function to load the question
let welcome = initialContent.querySelector('.welcome');
function loadQuestion() {
    if(count == 10) {
        titlebar.style.display = 'none';
        content.style.display = 'none';
        initialContent.style.display = 'flex';
        welcome.innerText = 'Score: ' + score;
        return;
    }
    ++count;
    qNo.innerText = count;
    options.innerHTML = '';
    myQuestion.innerText = myMcqs[count - 1].question;
    qNo.innerText = count;
    correctAnswer = myMcqs[count - 1].correct_answer;
    myOptions = [...myMcqs[count - 1].incorrect_answers, myMcqs[count - 1].correct_answer].sort(() => Math.random() - 0.5);
    // creating an element li
    myOptions.forEach(opt => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        options.appendChild(btn);
    });
}

// function to check whether the answer is correct or not
let printedScore = document.querySelector('.score');
function checkAnswer() {
    let allOptions = options.querySelectorAll('button');
    allOptions.forEach((opt) => {
        opt.addEventListener('click', (event) => {
            // changing the color according to the answer
            if(opt.innerText === correctAnswer) {
                opt.style.border = '3px solid green';
                ++score;
                printedScore.innerText = 'Score: ' + score;
            } else {
                opt.style.border = '3px solid red';
            }
            // disabling the buttons after click
            for(let opte of allOptions) {
                if(opte.innerText === correctAnswer) {
                    opte.style.border = '3px solid green';
                }
                opte.disabled = true;
            }
        });
    });
}

// To start the quiz (generate the first question)
startQuiz.addEventListener('click', async (event) => {
    loader.style.display = 'flex';
    await getQuiz();
    loader.style.display = 'none';
    score = 0, count = 0;
    printedScore.innerText = 'Score: ' + score;
    loadQuestion();
    checkAnswer();
    // hiding the initial-content and displaying the mcq
    content.style.display = 'inline-block';
    titlebar.style.display = 'flex';
    initialContent.style.display = 'none';
});

// button to go to initial content page of quiz
let restart = document.querySelector('.restart');
restart.addEventListener('click', (event) => {
    welcome.innerText = 'Welcome';
    count = 0;
    score = 0;
    printedScore.innerText = 'Score: ' + score;
    initialContent.style.display = 'flex';
    content.style.display = 'none';
    titlebar.style.display = 'none';
});

// .Button to get next questions (next button)
let next = document.querySelector('.next');
next.addEventListener('click', (event) => {
    loadQuestion();
    checkAnswer();
});
