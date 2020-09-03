const endPoint = "http://localhost:3000/api/v1/cards"

document.addEventListener('DOMContentLoaded', () => {
  console.log("Dom is loaded!")
  getCards()

  const createCardForm = document.querySelector("#create-card-form")
  createCardForm.addEventListener("submit", (e) => 
    createFormHandler(e))
})

function getCards() {
  fetch(endPoint)
  .then(resp => resp.json())
  .then(cards => {
    cards.data.forEach(card => {
      const cardMarkup = `
        <div data-id=${card.id}>
          <p>Question: ${card.attributes.question}</p>
          <p>Answer: ${card.attributes.answer}</p>
        </div>
      `;
      document.querySelector('#card-container').innerHTML += cardMarkup

    })
  })
}

function createFormHandler(e) {
  e.preventDefault()
  const questionInput = document.querySelector('#input-question').value
  const answerInput = document.querySelector('#input-answer').value
  // const collectionId = document.querySelector("#")
  postFetch(questionInput, answerInput)
}
