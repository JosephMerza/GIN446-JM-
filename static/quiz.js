// ======================================================
// QUESTIONS
// ======================================================
const questions = [ // Populate this array with question objects as needed.
// Each question object should have the following structure:
  {
     question:
       "Which keyword declares a block-scoped variable that can later be reassigned?",
     choices: ["var", "let", "const", "static"],
     answer: 1,
     explanation:
       "let declares a block-scoped variable whose value may later be reassigned.",
   },
  {
      question: 
        "Which symbol is used for a single-line comment in JavaScript?",
      choices: ["<!--", "//", "##", "/*"],
      answer: 1,
      explanation: 
       "Two forward slashes // are used to create a single-line comment."
    },
  {
      question: 
        "Which method adds an element to the end of an array?",
      choices: ["pop()", "shift()", "push()", "add()"],
      answer: 2,
      explanation: 
        "The push() method adds an element to the end of an array."
    },
  {
      question: 
        "Which operator is used to assign a value to a variable?",
      choices: ["==", "=", "===", "!="],
      answer: 1,
      explanation: 
        "The = operator assigns a value to a variable."
    },

  {
      question: 
        "Which method removes the last element from an array?",
      choices: ["remove()", "delete()", "shift()", "pop()"],
      answer: 3,
      explanation: 
        "The pop() method removes the last element from an array."
    },

  {
      question: 
        "What is the result of 5 === '5'?",
      choices: ["true", "false", "5", "undefined"],
      answer: 1,
      explanation: 
        "The === operator checks both value and type. 5 is a number while '5' is a string."
    },

  {
      question: 
        "What does the map() method return?",
      choices: ["A new array","A single number","A boolean","Nothing"],
      answer: 0,
      explanation: 
        "The map() method creates and returns a new array."
    },

  {
      question: 
        "What is the output of this code? let x = 10; if (x > 5) { x = 20; } console.log(x);",
      choices: ["5", "10", "20", "undefined"],
      answer: 2,
      explanation: 
        "Since 10 is greater than 5, x is changed to 20."
    },

  {
      question: 
        "What is the result of this code? const numbers = [1, 2, 3, 4]; const result = numbers.filter(n => n > 2);",
      choices: [
        "[1, 2]",
        "[2, 3]",
        "[3, 4]",
        "4"
      ],
      answer: 2,
      explanation: 
        "The filter() method returns the elements that satisfy the condition. Both 3 and 4 are greater than 2."
    },

  {
      question: 
        "What is the output of this code? let x = 5; function test() { let x = 10; return x; } console.log(test());",
      choices: ["5", "10", "15", "undefined"],
      answer: 1,
      explanation: 
        "The function has its own local variable x with the value 10, so test() returns 10."
    }  

   
];
// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) {
  //   Save the user's answer for the current question.
  userAnswers[currentQuestion] = choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
  //   Move to the next question if not at the last question.
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
}
}

function goPrevious() {
  //   Move to the previous question if not at the first question.
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
}
}

function goFirst() {
  //   Move to the first question.
   currentQuestion = 0;
    renderQuestion();
}
function goLast() {
  //   Move to the last question.
  currentQuestion = questions.length - 1;
    renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
  //   Calculate the user's score based on their answers.
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
            score++;
      }
    }
    return score;
}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
  //   Calculate the percentage score based on the total number of questions.
   return Math.round((score / questions.length) * 100);
}

// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
  //   Return a performance message based on the percentage score.
  if (percentage >= 80) {
    return "Excellent";
  }
  else if (percentage >= 60) {
    return "Good";
  }
  else if (percentage >= 50) {
    return "Average";
  }
  else {
    return "Needs improvement";
  }
}

// ======================================================
// BUILD CORRECTION
// ======================================================
function buildCorrection() {
  let correction = "";

  //   Build a correction string that includes the question, the user's answer,
  //   the correct answer, and an explanation for each question.
   for (let i = 0; i < questions.length; i++) {
    let userAnswer;
    if (userAnswers[i] !== undefined) {
      userAnswer = questions[i].choices[userAnswers[i]];
    } else {
      userAnswer = "Not Answered";
    }
    let correctAnswer = questions[i].choices[questions[i].answer];
    let result;
    if (userAnswers[i] === questions[i].answer) {
      result = "Correct";
    } else {
      result = "Incorrect";
    }
    correction +=
      "Question " + (i + 1) + ": " + questions[i].question + "\n\n" +
      "Your answer: " + userAnswer + "\n" +
      "Correct answer: " + correctAnswer + "\n" +
      "Result: " + result + "\n" +
      "Explanation: " + questions[i].explanation + "\n\n" +
      "────────────────────────────────────────\n\n";
  }

  return correction;
}

// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // --------------------------------------------------
  // QUESTION
  // --------------------------------------------------
  document.getElementById("questionText").textContent = q.question;

  // --------------------------------------------------
  // CHOICES
  // --------------------------------------------------
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    // Restore an answer previously selected
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`; 
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();
