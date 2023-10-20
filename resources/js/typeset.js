function randselect(dataset) {
  const index = Math.floor(Math.random() * dataset.length);
  return dataset[index];
}

class TypeSet {
  constructor(lang, type) {
    this._lang = lang.toLowerCase();
    this._type = type;
  }

  async fetchLangSet() {
    let requestURL = "./resources/json/" + this._lang + ".json";
    this._dataset = await fetch(requestURL)
      .then((res) => res.json())
      .then((data) => data[this._type]);
  }

  generateRandParagraph() {
    return randselect(this._dataset);
  }

  // Put the quote into an array of words
  processParagraph() {
    let paragraph = this.generateRandParagraph();
    let words;
    if (this._lang === "chinese") {
      words = paragraph.split("");
    } else {
      words = paragraph.split(" ");
    }
    this._words = words;
    return words;
  }

  get words() {
    return this._words;
  }

  // Create an array of span elements so we can set a class
  insertSpan() {
    let words = this.processParagraph();
    let spanWords;
    if (this._lang === "chinese") {
      spanWords = words.map((word) => `<span>${word}</span>`);
    } else {
      spanWords = words.map((word) => `<span>${word} </span>`);
    }
    return spanWords;
  }

  // Convert into string and set as innerHTML on quote display
  generateParagraph() {
    let spanWords = this.insertSpan();
    let innerHTML = spanWords.join("");
    this._innerHTML = innerHTML;
  }

  get innerHTML() {
    return this._innerHTML;
  }
}

export { TypeSet };
