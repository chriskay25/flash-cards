class Collection {

  constructor(data) {
    this.id = data.id
    this.name = data.attributes.name
    this.cards = data.attributes.cards
    Collection.all.push(this)
  }

}

Collection.all = [];