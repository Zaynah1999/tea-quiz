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
    questionText: "What's your favourite season?",
    answers: ["Spring", "Summer", "Autumn", "Winter"],
  },
  {
    questionText: "How do you feel when you wake up in the morning?",
    answers: ["Bright and cheerful", "Grumpy and sluggish", "Tired and confused", "Peaceful and content"],
  },
  {
    questionText: "Which of these activities is your favourite?",
    answers: ["Reading", "Swimming", "Team sport", "Drawing"],
  },
  {
    questionText: "Which of these is your favourite movie genre?",
    answers: ["Horror", "Romance", "Comedy", "Action"],
  },
  {
    questionText: "What do you like to do on a Friday night?",
    answers: ["Straight to bed", "See friends", "Party till sunrise", "Chill with my cats"],
  },
];

function createOptionButton(answer, answerIndex, questionIndex) {
  const optionContainer = document.createElement("div");

  const optionRadioButton = document.createElement("input");
  optionRadioButton.type = "radio";
  optionRadioButton.name = `question-${questionIndex}`;
  optionRadioButton.id = `question-${questionIndex}-answer-${answerIndex}`;
  optionRadioButton.value = answer;
  optionRadioButton.required = true;
  optionContainer.appendChild(optionRadioButton);

  const optionLabel = document.createElement("label");
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
  imageDescription.textContent = "Look, it's you";
  imageContainer.appendChild(imageDescription);

  const image = document.createElement("img");
  image.src = randomImageUrl;
  image.alt = randomImageUrl.slice("images/".length, randomImageUrl.length - ".webp".length).replaceAll("-", " ");
  imageContainer.appendChild(image);

  document.body.appendChild(imageContainer);
}

function generateQuestion(questionIndex) {
  const question = questions[questionIndex];

  const questionContainer = document.createElement("form");

  const questionParagraph = document.createElement("p");
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
    questionContainer.addEventListener("submit", function (event) {
      event.preventDefault();
      confirmButton.remove();
      generateTeaMatch();
    });
  } else {
    confirmButton.textContent = "Next question";
    questionContainer.addEventListener("submit", function (event) {
      event.preventDefault();
      confirmButton.remove();
      generateQuestion(questionIndex + 1);
    });
  }
  confirmButtonContainer.appendChild(confirmButton);

  questionContainer.appendChild(confirmButtonContainer);

  document.body.appendChild(questionContainer);
}

generateQuestion(0);
