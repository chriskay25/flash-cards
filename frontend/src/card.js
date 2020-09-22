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

  // renderCard(index) {
  //   const cardHolder = document.querySelector(".carousel-inner")
  //   const cardDisplay = document.createElement("div")
  //   cardDisplay.setAttribute("class", "carousel-item active")
  //   cardHolder.appendChild(cardDisplay)
  //   const singleCard = document.createElement("div")
  //   singleCard.setAttribute("class", "d-block w-100")
  //   singleCard.setAttribute("id", `card-${this.id}`)
  //   cardDisplay.appendChild(singleCard)
  //   const questionNumber = document.createElement("p")
  //   questionNumber.innerHTML = `<strong>Question ${index + 1}</strong>`
  //   const q = document.createElement("p")
  //   q.innerHTML = this.question
  //   const userInput = document.createElement("input")
  //   userInput.id = `card-${this.id}-input`
  //   const button = document.createElement("button")
  //   button.dataset.id = this.id
  //   button.innerHTML = "SUBMIT"
  //   singleCard.appendChild(questionNumber)
  //   singleCard.appendChild(q)
  //   singleCard.appendChild(userInput)
  //   singleCard.appendChild(button)
  //   button.addEventListener("click", checkAnswer, false)
  // }

  renderCard(index) {
    const cardDisplay = document.querySelector(".carousel-inner")
    const card = document.createElement("div")
    index === 0 ? card.setAttribute("class", "carousel-item active") : card.setAttribute("class", "carousel-item")
    cardDisplay.append(card)
    const cardInner = `
      <div class="card d-block w-100" style="width: 18rem;">
        <div id="card-${this.id}" class="card-body">
          <h5 class="card-title">Question ${index + 1}</h5>
          <p class="card-text">${this.question}</p>
          <input id="card-${this.id}-input" class="card-text" type="text" />
          <button data-id="${this.id}" class="btn btn-primary">SUBMIT</a>
        </div>
      </div>
    `
    card.innerHTML += cardInner
  }

}

Card.all = []
