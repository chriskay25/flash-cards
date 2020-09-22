class Card {

  constructor(data) {
    this.id = data.id
    this.question = data.question
    this.answer = data.answer
    this.collectionId = data.collection_id // use camelCase
    Card.all.push(this)
  }

  get collection() {
    return Collection.findById(this.collectionId)
  }

  static findById(id) {
    return this.all.find(card => parseInt(card.id) === id)
  }

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
