const endPoint = "http://localhost:3000/api/v1/cards"
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
  fetch("http://localhost:3000/api/v1/collections")
  .then(resp => resp.json())
  .then(collections => {
    collections.data.forEach(collection => {
      new Collection(collection)
    })
    displayCollections(collections)
  })
}

function displayCollections(collections) {
  // Display choices
  const collection = document.querySelector(".collection-choice")
  // Ask what collection they want to study
  const offerChoice = document.createElement('h3')
  offerChoice.innerHTML = "Which collection would you like to study?"
  collection.append(offerChoice)
  // Iterate over list of collections, creating buttons for each
  collections.data.forEach(choice => {
    // debugger
    const button = document.createElement('button')
    button.innerHTML = choice.attributes.name
    // Insert collection button into div
    collection.append(button)

    button.addEventListener("click", function() {
      getCards(this.innerHTML)
    })
  })
}

function getCards(name) {
  // Fetches cards to pass along
  fetch(endPoint)
    .then(resp => resp.json())
    .then(cards => correctCards(cards, name))
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

