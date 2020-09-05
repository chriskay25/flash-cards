class Collection {

  constructor(data) {
    this.id = data.id
    this.name = data.attributes.name
    this.cards = data.attributes.cards
    Collection.all.push(this)
  }

  renderCollectionButton() {
    let button = document.createElement("button")
    button.innerHTML = this.name
    collectionChoice.append(button)

    button.addEventListener("click", function() {
      getCards(this.innerHTML)
    })
  }

}

Collection.all = [];