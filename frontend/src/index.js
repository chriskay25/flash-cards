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
  console.log(collections)
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

