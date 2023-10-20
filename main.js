import { TypeSet } from "./resources/js/typeset.js";

// Initial function variables
let timerState = false;
let startTime;
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// Initial setting variables
let lang = "en";
let typeSubset = "quote";

// page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");
const restartButton = document.getElementById("restart-button");

let currentTypeSet = new TypeSet(lang, typeSubset);

async function gameSetUp() {
  // reset the word index for tracking
  wordIndex = 0;
  // set timerState false to restart timer
  timerState = false;

  // setup the type set
  await currentTypeSet.fetchLangSet();
  // generate paragraph
  currentTypeSet.generateParagraph();
  // set global variable for textbox
  words = currentTypeSet.words;
  console.log(words);
  // get a quote and updates UI
  quoteElement.innerHTML = currentTypeSet.innerHTML;
  // Highlight the first word
  quoteElement.childNodes[0].className = "highlight";
  // Clear any prior messages
  messageElement.innerText = "";

  // Setup the textbox
  // Enable the textbox input
  typedValueElement.disabled = false;
  // Clear the textbox
  typedValueElement.value = "";
  // set focus
  typedValueElement.focus();
}

// Initial game setup
gameSetUp();

// Set restart button to func gameSetUp
restartButton.addEventListener("click", gameSetUp);

// Process Textbox Input
typedValueElement.addEventListener("input", () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue && !timerState) {
    timerState = true;
    startTime = new Date().getTime();
  }

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // reset timer state
    timerState = false;
    // reset last word state
    quoteElement.childNodes[wordIndex].className = "";
    // disable textbox input
    typedValueElement.disabled = true;
    // clear textbox
    typedValueElement.value = "";

    // Display success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // end of word
    // reset the old word state to none
    quoteElement.childNodes[wordIndex].className = "";
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else {
    // error state
    quoteElement.childNodes[wordIndex].className = "error";
  }
});
