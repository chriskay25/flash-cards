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

  renderCard() {
    // Try to wipe the card clean at the start
    const cardDisplay = document.querySelector("#card-display")
    cardDisplay.innerHTML = ""
    const h2 = document.createElement("h2")
    h2.innerHTML = this.collection.name
    const q = document.createElement("p")
    q.innerHTML = this.question
    const userInput = document.createElement("input")
    userInput.id = "user-answer"
    const button = document.createElement("button")
    button.dataset.id = this.id
    button.innerHTML = "SUBMIT"
    const correct = document.createElement("p")
    correct.id = "correct-incorrect"
    const yourAnswer = document.createElement("p")
    yourAnswer.id = "your-answer"
    const correctAnswer = document.createElement("p")
    correctAnswer.id = "correct-answer"
    cardDisplay.appendChild(h2)
    cardDisplay.appendChild(q)
    cardDisplay.appendChild(userInput)
    cardDisplay.appendChild(button)
    cardDisplay.appendChild(correct)
    cardDisplay.appendChild(yourAnswer)
    cardDisplay.appendChild(correctAnswer)
    button.addEventListener("click", function(e) {
      event.preventDefault()
      checkAnswer(this.dataset.id)
    })
  }

}

Card.all = []
