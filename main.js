const imageUrls = [
  "images/after-dinner.webp",
  "images/blackcurrant-beauty.webp",
  "images/breathe-in-with-eucalyptus.webp",
  "images/clean-matcha-green.webp",
  "images/english-breakfast.webp",
  "images/feel-new.webp",
  "images/fresh-start.webp",
  "images/ginseng-matcha-green.webp",
  "images/joy.webp",
  "images/love.webp",
  "images/mint-matcha-green.webp",
  "images/mint-refresh.webp",
  "images/morning-berry.webp",
  "images/nighttime-berry.webp",
  "images/peace.webp",
  "images/radiance.webp",
  "images/relax.webp",
  "images/revitalise.webp",
  "images/supreme-matcha-green.webp",
  "images/three-chamomile.webp",
  "images/three-fennel.webp",
  "images/three-ginger.webp",
  "images/three-licorice.webp",
  "images/three-mint.webp",
  "images/tulsi-clarity.webp",
  "images/turmeric-active.webp",
  "images/turmeric-gold.webp",
  "images/vanilla-chai.webp",
  "images/wild-apple-and-cinnamon.webp",
  "images/winter-warmer.webp",
];

const questions = [
  {
    questionText: "Do you prefer hot or cold weather?",
    answers: ["Hot weather", "Cold weather"],
  },
  {
    questionText: "Are you an early bird or a night owl?",
    answers: ["Early bird", "Night owl"],
  },
  {
    questionText: "Would you rather live in the countryside or the city?",
    answers: ["Countryside", "City"],
  },
  {
    questionText: "Which flavours do you prefer, sweet or savoury?",
    answers: ["Sweet", "Savoury"],
  },
  {
    questionText: "Are you an indoor person or an outdoor person?",
    answers: ["Indoor person", "Outdoor person"],
  },
];

function createOptionButton(answer, answerIndex, questionIndex) {
  const optionContainer = document.createElement("div");
  optionContainer.className = "option-container";

  const optionRadioButton = document.createElement("input");
  optionRadioButton.className = "option-radio-button";
  optionRadioButton.type = "radio";
  optionRadioButton.name = `question-${questionIndex}`;
  optionRadioButton.id = `question-${questionIndex}-answer-${answerIndex}`;
  optionRadioButton.value = answer;
  optionRadioButton.required = true;
  optionContainer.appendChild(optionRadioButton);

  const optionLabel = document.createElement("label");
  optionLabel.className = "option-label";
  optionLabel.htmlFor = `question-${questionIndex}-answer-${answerIndex}`;
  optionLabel.textContent = answer;
  optionContainer.appendChild(optionLabel);

  return optionContainer;
}

function generateTeaMatch() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const randomImageUrl = imageUrls[randomIndex];

  const imageContainer = document.createElement("div");

  const imageDescription = document.createElement("p");
  imageDescription.className = "tea-image-description";
  imageDescription.textContent = "Look, it's you";
  imageContainer.appendChild(imageDescription);

  const image = document.createElement("img");
  image.className = "tea-image";
  image.src = randomImageUrl;
  image.alt = randomImageUrl.slice("images/".length, randomImageUrl.length - ".webp".length).replaceAll("-", " ");
  imageContainer.appendChild(image);

  document.body.appendChild(imageContainer);
}

function generateQuestion(questionIndex) {
  const question = questions[questionIndex];

  const questionContainer = document.createElement("form");
  questionContainer.className = "question-container";

  const questionParagraph = document.createElement("p");
  questionParagraph.className = "question-paragraph";
  questionParagraph.textContent = question.questionText;
  questionContainer.appendChild(questionParagraph);

  const questionOptions = question.answers.map(function (answer, answerIndex) {
    return createOptionButton(answer, answerIndex, questionIndex);
  });
  questionOptions.forEach(function appendOption(option) {
    questionContainer.appendChild(option);
  });

  const confirmButtonContainer = document.createElement("p");

  const confirmButton = document.createElement("button");
  if (questionIndex === questions.length - 1) {
    confirmButton.textContent = "Spill the tea";
    questionContainer.addEventListener("submit", function completeQuestions(event) {
      event.preventDefault();
      confirmButton.remove();
      generateTeaMatch();
    });
  } else {
    confirmButton.textContent = "Next question";
    questionContainer.addEventListener("submit", function getNextQuestion(event) {
      event.preventDefault();
      confirmButton.remove();
      generateQuestion(questionIndex + 1);
    });
  }
  confirmButtonContainer.appendChild(confirmButton);

  questionContainer.appendChild(confirmButtonContainer);

  document.body.appendChild(questionContainer);
}

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function startQuestions() {
  startButton.remove();
  generateQuestion(0);
});
