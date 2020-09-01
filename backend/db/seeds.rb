# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Collection.destroy_all
Card.destroy_all

# -Might have to put a dependent: :destroy on Collection model
#   for the destroy_all to work. Apparently this is due to the
#   indexing.

collection1 = Collection.create(name: "Javascript")
collection1.cards.create([
  {question: "What collection does this card belong in?", answer: "javascript"},
  {question: "What function can be called after fetch, in case something goes wrong?", answer: "catch"},
  {question: "'{}', in Javascript terms, represents a...", answer: "object"},
  {question: "True or False: the properties(keys) of JS Objects can point to any data type, including other Objects.", answer: "true"}
])