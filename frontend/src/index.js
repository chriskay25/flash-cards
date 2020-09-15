const endPoint = "http://localhost:3000/api/v1"
const cardForm = document.querySelector(".form-container")
const cardContainer = document.querySelector(".card-container")
const collectionChoice = document.querySelector(".collection-choice")
const scoreboard = document.querySelector("#scoreboard")
const questionNumberDisplay = document.querySelector("#question-number")
const displayScore = document.querySelector("#display-score")
var score;

document.addEventListener('DOMContentLoaded', () => {
  console.log("Dom is loaded!")
  cardForm.style.display = "none"
  scoreboard.style.display = "none"
  getCollections()
})

function getCollections() {
  fetch(endPoint + "/collections")
  .then(resp => resp.json())
  .then(collections => {
    const offerChoice = document.createElement('h3')
    offerChoice.innerHTML = "Which collection would you like to study?"
    collectionChoice.append(offerChoice)
    collections.data.forEach(collection => {
      let newCollection = new Collection(collection)
      newCollection.renderCollectionButton()
    })
  })
}
  
function chosenCollection() {
  collectionChoice.style.display = "none" // hide collection choice
  renderScoreboard()
  let collection = Collection.findById(parseInt(this.dataset.id))
  const h2 = document.createElement("h2")
  h2.innerHTML = collection.name
  cardContainer.insertAdjacentElement("afterbegin", h2)
  let collectionCards = collection.cards.map(card => { return new Card(card) })
  
  collectionCards.forEach(function(card, index) {
    card.renderCard(index)
  })
}

function checkAnswer() {
  let id = this.dataset.id
  let card = Card.findById(parseInt(id))
  let singleCard = document.querySelector(`#card-${id}`)
  let userAnswer = document.querySelector(`#card-${id}-input`)

  if (userAnswer.value === card.answer) {
    displayScore.innerHTML = score += 1
    singleCard.style.backgroundColor = "green"
  } else {
    displayScore.innerHTML = score
    singleCard.style.backgroundColor = "red"
  }
  
  this.removeEventListener("click", checkAnswer, false)
}

function renderScoreboard() {
  scoreboard.style.display = "block"
  document.querySelector("#scoreboard-header").innerHTML = "Score"
  score = 0
  displayScore.innerHTML = score
}
