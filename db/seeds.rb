# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
require 'faker'
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'Create test user'

andris = User.new(
    name: "andris",
    email: "andris@mail.com",
    password: "Password"
  )
andris.save!

Itinerary.new(start_address: "16 Villa Gaudelet, 75011 Paris", end_address: "30 rue ballu 75009 paris",
              start_latitude: 48.8648601,
              start_longitude: 2.3798866,
              end_latitude: 48.8821058,
              end_longitude: 2.3294068)
