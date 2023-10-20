function randselect(dataset) {
  const index = Math.floor(Math.random() * dataset.length);
  return dataset[index];
}

class TypeSet {
  constructor(lang, type) {
    this._lang = lang;
    this._type = type;
    this._requestURL = "./resources/json/" + lang + ".json";
  }

  async randParagraph() {
    let dataset = await fetch(this._requestURL)
      .then((res) => res.json())
      .then((data) => data[this._type]);
    return randselect(dataset);
  }
}

export { TypeSet };
