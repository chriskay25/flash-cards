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

collection2 = Collection.create(name: "Rails")
collection2.cards.create([
  {question: "What is the built-in ORM that Rails utilizes to manage models and communicate with the database?", answer: "active record"},
  {question: "The routes.rb file can be found in which Rails directory?", answer: "config"},
  {question: "Does the show action typically correspond with a static route or dynamic route?", answer: "dynamic"},
  {question: "If you get a 'ForbiddenAttributesError', you probably forgot to use ______", answer: "strong params"},
  {question: "The only way to trigger validation without touching the database is to call the ______ method", answer: "valid?"}
])

collection3 = Collection.create(name: "Biology")
collection3.cards.create([
  {question: "What openings in a leaf allow gas exchange?", answer: "stomata"},
  {question: "Fish take in oxygen through their gills; what do insects take in oxygen through?", answer: "spiracles"},
  {question: "Which nutrient group is used to help grow and repair cells?", answer: "proteins"},
])
