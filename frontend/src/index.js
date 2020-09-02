const test = "Is it working?"
const endPoint = "http://localhost:3000/api/v1/cards"

document.addEventListener('DOMContentLoaded', () => {
  console.log("Dom is loaded!")
  getCards()
})

function getCards() {
  fetch(endPoint)
  .then(resp => resp.json())
  .then(cards => {
    console.log(cards)
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