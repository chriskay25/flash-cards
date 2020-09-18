const endPoint = "http://localhost:3000/api/v1"
const cardForm = document.querySelector("#create-card-form")
const collectionContainer = document.querySelector(".collection-container")
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
  collectionContainer.insertAdjacentElement("afterbegin", h2)
  let collectionCards = collection.cards.map(card => { return new Card(card) })
  let bttn = document.createElement("button")
  bttn.innerHTML = "Add card to collection"
  bttn.dataset.collectionId = collection.id
  h2.appendChild(bttn)
  bttn.addEventListener("click", newCardForm)
  
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
  document.querySelector("#scoreboard-header").innerHTML = "SCORE"
  score = 0
  displayScore.innerHTML = score
}

function newCardForm() {
  cardForm.style.display = "block"
  let collectionId = this.dataset.collectionId
  addListener(collectionId)
}

const addListener = (collectionId) => {
  cardForm.addEventListener("submit", function() { 
    event.preventDefault()
    const questionInput = document.querySelector('#input-question').value
    const answerInput = document.querySelector('#input-answer').value
    postFetch(questionInput, answerInput, collectionId)
  })
}

function postFetch(question, answer, collection_id) {
  const bodyData = {question, answer, collection_id}
  fetch(endPoint + "/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bodyData)
  })
  .then(resp => resp.json())
  .then(cardData => addNewCard(cardData))
}

function addNewCard(cardData) {
  let card = cardData.data
  let id = parseInt(card.id)
  let question = card.attributes.question
  let answer = card.attributes.answer
  let collection_id = card.attributes.collection_id
  const newCard = new Card( {id, question, answer, collection_id} )
  newCard.renderCard()
  let qnum = newCard.collection.cards.length + 1
  document.querySelector(`#card-${newCard.id}`).firstElementChild.innerHTML = `<strong>Question ${qnum}</strong>`
  alert("Card added to collection!")
  cardForm.style.display = "none"
}

