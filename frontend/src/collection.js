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
    button.dataset.id = this.id 
    collectionChoice.append(button)

    button.addEventListener("click", function() {
      getChosenCollection(this.dataset.id)
    })
  }

  static findById(id) {
    return this.all.find(collection => parseInt(collection.id) === id);
  }

}

Collection.all = [];