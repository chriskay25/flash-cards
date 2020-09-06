const endPoint = "http://localhost:3000/api/v1"
const cardForm = document.querySelector(".form-container")
const cardContainer = document.querySelector("#card-container")
const collectionChoice = document.querySelector(".collection-choice")

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

function getChosenCollection(id) {
  // Fetches cards to pass along
  fetch(endPoint + `/collections/${id}`)
    .then(resp => resp.json())
    .then(collection => chosenCollection(collection.data))
  }
  
function chosenCollection(collection) {
  collectionChoice.style.display = "none" // hide collection choice
  cardContainer.style.display = "block" // make card container visible
  collection.attributes.cards.forEach(newCard => {
    let card = new Card(newCard)
    populateCard(card)
  })
}

function populateCard(card) {
  const q = document.querySelector("#question-display")
  q.innerHTML = card.question
  const c = document.querySelector("#collection-name")
  c.innerHTML = card.collection.name
  const bttn = document.querySelector("#submit-answer")
  bttn.addEventListener("click", function() {
    let answer = document.querySelector("#user-answer").value
    console.log(`submitted: ${answer}`, `actual: ${card.answer}`)
  })
}
