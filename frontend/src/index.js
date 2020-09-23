const endPoint = "http://localhost:3000/api/v1"
const api = new ApiAdapter
const cardForm = document.querySelector("#create-card-form")
const cardScoreboard = document.querySelector("#card-scoreboard")
const collectionChoice = document.querySelector(".collection-choice")
const scoreboard = document.querySelector("#scoreboard")
const displayScore = document.querySelector("#display-score")
let score;
let collection;


document.addEventListener('DOMContentLoaded', () => {
  console.log("Dom is loaded!")
  cardForm.style.display = "none"
  scoreboard.style.display = "none"
  getCollections()
})

function getCollections() {
  const colls = api.get("/collections")
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
  
function chosenCollection(coll_id) {
  collectionChoice.style.display = "none" // hide collection choice
  renderScoreboard()
  if (coll_id === true) { // when called by addNewCard()
    collection = Collection.findById(coll_id)
  } else {
    collection = Collection.findById(parseInt(this.dataset.id))
  }
  const h2 = document.createElement("h2")
  h2.innerHTML = `Collection: ${collection.name}`
  cardScoreboard.insertAdjacentElement("afterbegin", h2)
  h2.setAttribute("class", "py-5")
  let collectionCards = collection.cards.map(card => { return new Card(card) })
  let bttn = document.createElement("button")
  bttn.setAttribute("class", "btn btn-light")
  bttn.innerHTML = "Add card to collection"
  bttn.dataset.collectionId = collection.id
  h2.appendChild(bttn)
  bttn.addEventListener("click", newCardForm)
  
  collectionCards.forEach(function(card, index) {
    card.renderCard(index)
    let bttn = document.querySelector(`button[data-id="${card.id}"]`)
    bttn.addEventListener("click", checkAnswer)
  })
  
  $('.carousel').carousel('pause') // Pause card rotation

}

const nextQuestion = (bttn) => {
  bttn.innerHTML = "NEXT"
  bttn.style.backgroundColor = "yellow"
  bttn.style.color = "black"
  bttn.addEventListener("click", (e) => {
    $('.carousel').carousel('next') // Rotate card
  })
}

const percentScore = (collection) => {
  let collectionLength = collection.cards.length
  let percent = (score / collectionLength) * 100
  return `${score} / ${collectionLength} = ${percent.toFixed(2)}%`
}

function checkAnswer() {
  let id = this.dataset.id
  let card = Card.findById(parseInt(id))
  let singleCard = document.querySelector(`#card-${id}`)
  let userAnswer = document.querySelector(`#card-${id}-input`)
  let correctAnswer = document.createElement("span")
  correctAnswer.setAttribute("id", "correct-answer")
  singleCard.appendChild(correctAnswer)

  if (userAnswer.value === card.answer) {
    score +=1
    singleCard.style.backgroundColor = "#6acc80"
    correctAnswer.innerHTML = "Correct!"
  } else {
    singleCard.style.backgroundColor = "#dc3545"
    correctAnswer.innerHTML = `Correct Answer: ${card.answer}`
  }
  
  displayScore.innerHTML = percentScore(card.collection)
  this.removeEventListener("click", checkAnswer)
  nextQuestion(this)
}

function renderScoreboard() {
  scoreboard.style.display = "block"
  document.querySelector("#scoreboard-header").innerHTML = "SCORE"
  score = 0
  displayScore.innerHTML = score
}

function newCardForm() {
  cardScoreboard.style.display = "none"
  cardForm.style.display = "block"
  let collectionId = this.dataset.collectionId
  addListener(collectionId)
}

const addListener = (collectionId) => {
  cardForm.addEventListener("submit", function() { 
    event.preventDefault()
    const questionInput = document.querySelector('#input-question').value
    const answerInput = document.querySelector('#input-answer').value
    const postedCard = postCard("/cards", questionInput, answerInput, collectionId)
  })
}

function postCard(url, questionInput, answerInput, collectionId) {
  api.post(url, questionInput, answerInput, collectionId)
    .then(cardData => {
      const card = cardData.data
      addNewCard(card)
    })
}

function addNewCard(card) {
  let id = parseInt(card.id)
  let question = card.attributes.question
  let answer = card.attributes.answer
  let collection_id = card.attributes.collection_id
  const newCard = new Card( {id, question, answer, collection_id} )
  return newCard
}

