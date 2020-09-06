class Card {

  constructor(data) {
    this.id = data.id
    this.question = data.question
    this.answer = data.answer
    this.collection_id = data.collection_id
    Card.all.push(this)
  }

  get collection() {
    return Collection.findById(this.collection_id)
  }

}

Card.all = []
