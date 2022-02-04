/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app.

  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [{
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia?',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'Which is the largest country in the world?',
      o: ['USA', 'India', 'China', 'Russia'],
      a: 3,
    },
    {
      q: 'The United States consists of how many states?',
      o: ['40', '30', '50', '60'],
      a: 2,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0" value="${quizItem.o[0]}"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1" value="${quizItem.o[1]}"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2" value="${quizItem.o[2]}"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3" value="${quizItem.o[3]}"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          //change background color of li element here
          liElement.style.backgroundColor = "yellow";
        }

        if (radioElement.checked) {
          // code for task 1 goes here.
          // if selected radio value is correct, then increase the score
          if (quizItem.a == i) {
            score += 1;
          }
        }
      }
    });

    return score;
  };

  // call the displayQuiz function
  displayQuiz();


  const scoreText = document.querySelector("#score");
  const timer = document.querySelector("#time");
//this function can be used for both Task 2 and Task 5 as requirements are the same(end Quiz, highlight correct answers, and display the score)
  const endQuiz = () => {
    console.log('Ending quiz');
    let userScore = calculateScore();
    scoreText.innerHTML = "Quiz has ended. Your total score is " + userScore;

    // Scroll to top of the page
    // https://stackoverflow.com/questions/4147112/how-to-jump-to-top-of-browser-page
    $(window).scrollTop(0);
  };

  let myTimeout;

  // code for task 2 goes here
  const btnSubmit = document.querySelector("#btnSubmit");
  btnSubmit.addEventListener("click", (event) => {
    endQuiz();
  });

  // code for task 4 goes here
  const btnReset = document.querySelector("#btnReset");
  btnReset.addEventListener("click", (event) => {
    window.location.reload();
  });

  //code for task 5 goes here
  const btnStart = document.querySelector("#startButton");
  btnStart.addEventListener("click", (event) => {
    myTimeout = setTimeout(endQuiz, 120000);

    //Optional: Add a "0" at front when the Second number is single-digit.
    //https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
    let minute = 1;
    let sec = 59;
    setInterval(function () {
      secText = (sec > 10) ? sec : "0" + sec;
      timer.innerHTML = minute + " : " + secText;
      sec--;
      if (sec == 00) {
        minute--;
        sec = 59;
      }
    }, 1000);
  });
});