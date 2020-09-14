class Card {

  constructor(data) {
    this.id = data.id
    this.question = data.question
    this.answer = data.answer
    this.collection_id = data.collection_id
    Card.all.push(this)
  }

  get collection() {
    return Collection.findById(this.collection_id)
  }

  static findById(id) {
    return this.all.find(card => parseInt(card.id) === id)
  }

  renderCard(index) {
    const cardDisplay = document.querySelector("#card-display")
    const singleCard = document.createElement("div")
    singleCard.setAttribute("class", "single")
    cardDisplay.appendChild(singleCard)
    const questionNumber = document.createElement("p")
    questionNumber.innerHTML = `<strong>Question ${index + 1}</strong>`
    const q = document.createElement("p")
    q.innerHTML = this.question
    const userInput = document.createElement("input")
    userInput.id = "user-answer"
    const button = document.createElement("button")
    button.dataset.id = this.id
    button.innerHTML = "SUBMIT"
    singleCard.appendChild(questionNumber)
    singleCard.appendChild(q)
    singleCard.appendChild(userInput)
    singleCard.appendChild(button)
    button.addEventListener("click", checkAnswer, false)
  }

}

Card.all = []
