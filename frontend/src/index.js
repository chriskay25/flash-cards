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
  
function chosenCollection() {
  const collectionCards = []
  collectionChoice.style.display = "none" // hide collection choice
  cardContainer.style.display = "block" // make card container visible
  let collection = Collection.findById(parseInt(this.dataset.id))
  
  collection.cards.forEach(card => {
    let newCard = new Card(card)
    collectionCards.push(newCard)
  })
}


