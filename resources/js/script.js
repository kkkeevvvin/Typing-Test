// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

function randQuote() {
  // all of our quotes
  const quotes = [
    "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    "There is nothing more deceptive than an obvious fact.",
    "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
    "I never make exceptions. An exception disproves the rule.",
    "What one man can invent another can discover.",
    "Nothing clears up a case so much as stating it to another person.",
    "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
    "Everybody wants to be famous, but nobody wants to do the work. I live by that. You grind hard so you can play hard. At the end of the day, you put all the work in, and eventually it'll pay off. It could be in a year, it could be in 30 years. Eventually, your hard work will pay off. - Kevin Hart",
  ];

  const quoteIndex = Math.floor(Math.random() * quotes.length);
  return quotes[quoteIndex];
}

const gameSetUp = function () {
  // get a quote
  const quote = randQuote();
  // Put the quote into an array of words
  words = quote.split(" ");
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  // Highlight the first word
  quoteElement.childNodes[0].className = "highlight";
  // Clear any prior messages
  messageElement.innerText = "";

  // Setup the textbox
  // Clear the textbox
  typedValueElement.disabled = false;
  typedValueElement.value = "";
  // set focus
  typedValueElement.focus();
};

gameSetUp();

// fuctions here
document.getElementById("restart-button").addEventListener("click", gameSetUp);

let timerStart = false;
typedValueElement.addEventListener("input", () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue && !timerStart) {
    console.log("start timer!");
    timerStart = true;
    startTime = new Date().getTime();
  }

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    timerStart = false;
    typedValueElement.disabled = true;
    typedValueElement.value = "";
    quoteElement.childNodes[wordIndex].className = "";
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    quoteElement.childNodes[wordIndex].className = "";
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    // for (const wordElement of quoteElement.childNodes) {
    //   wordElement.className = "";
    // }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    typedValueElement.className = "error";
  }
});
