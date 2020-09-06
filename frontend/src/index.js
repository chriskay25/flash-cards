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
  
function correctCards(cards, name) {
  collectionChoice.style.display = "none"
  // Make the card container visible
  cardContainer.style.display = "block"
  const chosenCards = []
  cards.data.forEach(card => {
    if (card.attributes.collection.name === name) {
      chosenCards.push(card)
    }
  })
  cardIterator(chosenCards)
}
  
function cardIterator(cards) {
  console.log(cards)
  const q = document.querySelector("#question-display")
  cards.forEach(card => {
    q.innerHTML = card.attributes.question
  })
}

// function getCards() {
//   fetch(endPoint)
//   .then(resp => resp.json())
//   .then(cards => {
//     cards.data.forEach(card => {
//       const cardMarkup = `
//         <div data-id=${card.id}>
//           <p>Question: ${card.attributes.question}</p>
//           <p>Answer: ${card.attributes.answer}</p>
//         </div>
//       `;
//       document.querySelector('#card-container').innerHTML += cardMarkup

//     })
//   })
// }

