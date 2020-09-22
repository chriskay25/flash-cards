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
    button.setAttribute("class", "btn collection-btn")
    collectionChoice.append(button)

    button.addEventListener("click", chosenCollection)
  }
    
  static findById(id) {
    return this.all.find(collection => parseInt(collection.id) === id);
  }

}

Collection.all = [];