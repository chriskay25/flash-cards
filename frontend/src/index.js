const endPoint = "http://localhost:3000/api/v1"
const cardForm = document.querySelector(".form-container")
const cardContainer = document.querySelector("#card-container")
const collectionChoice = document.querySelector(".collection-choice")
const scoreboard = document.querySelector("#scoreboard")

document.addEventListener('DOMContentLoaded', () => {
  console.log("Dom is loaded!")
  cardForm.style.display = "none"
  cardContainer.style.display = "none"
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
  const collectionCards = []
  collectionChoice.style.display = "none" // hide collection choice
  cardContainer.style.display = "block" // make card container visible
  let collection = Collection.findById(parseInt(this.dataset.id))
  renderScoreboard(collection)
  
  collection.cards.forEach(card => {
    let newCard = new Card(card)
    collectionCards.push(newCard)
  })

  delayIteration(collectionCards)
}

function delayIteration(collectionCards) {
  const delayLoop = (delay) => {
    return (card, i) => {
      setTimeout(() => {
        card.renderCard()
      }, i * delay);
    }
  }
  collectionCards.forEach(delayLoop(15000))
}

function checkAnswer(id) {
  let card = Card.findById(parseInt(id))
  let userAnswer = document.querySelector("#user-answer")
  let correctIncorrect = document.querySelector("#correct-incorrect")
  let yourAnswer = document.querySelector("#your-answer")
  let correctAnswer = document.querySelector("#correct-answer")
  if (userAnswer.value === card.answer) {
    correctIncorrect.innerHTML = "Holy shit you did it!"
    yourAnswer.innerHTML = `Your answer: ${userAnswer.value}`
    correctAnswer.innerHTML = `The correct answer: ${card.answer}`
    return true 
  } else {
    correctIncorrect.innerHTML = "Utter failure!"
    yourAnswer.innerHTML = `Your answer: ${userAnswer.value}`
    correctAnswer.innerHTML = `Correct answer: ${card.answer}`
    return false
  }
}

function renderScoreboard(collection) {
  document.querySelector("#scoreboard-header").innerHTML = "Score"
  let questionNumber = 1
  let questionNumberDisplay = document.querySelector("#question-number")
  questionNumberDisplay.innerHTML =  `Question ${questionNumber} of ${collection.cards.length}`
}