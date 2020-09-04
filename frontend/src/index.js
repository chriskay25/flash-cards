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
    console.log(choice)
    const button = document.createElement('button')
    button.innerHTML += choice.attributes.name
    // Insert collection button into div
    collection.appendChild(button)

    button.addEventListener("click", function() {
      getCards(this.innerHTML)
    })
  })
}

function getCards(name) {
  console.log(name)
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

