# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
require 'faker'

require 'open-uri'
require 'json'
require 'time'
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'Create test user'

andris = User.new(
  first_name: "andris",
  last_name: "andris",
  email: "andris@mail.com",
  password: "Password"
)
andris.save!

puts 'Create test itinerary'

weather_data = "{\"insee\"=>\"75101\", \"cp\"=>75001, \"latitude\"=>48.8626, \"longitude\"=>2.3363, \"day\"=>0, \"datetime\"=>\"2022-12-06T01:00:00+0100\", \"wind10m\"=>10, \"gust10m\"=>24, \"dirwind10m\"=>17, \"rr10\"=>0, \"rr1\"=>0, \"probarain\"=>10, \"weather\"=>3, \"tmin\"=>1, \"tmax\"=>#{rand(1..35)}, \"sun_hours\"=>2, \"etp\"=>0, \"probafrost\"=>70, \"probafog\"=>80, \"probawind70\"=>0, \"probawind100\"=>0, \"gustx\"=>24}"

Itinerary.new(start_address: "16 Villa Gaudelet, 75011 Paris", end_address: "30 rue ballu 75009 paris",
              start_latitude: 48.8648601,
              start_longitude: 2.3798866,
              end_latitude: 48.8821058,
              end_longitude: 2.3294068)


40.times do
  Itinerary.new(start_address: "16 Villa Gaudelet, 75011 Paris", end_address: "30 rue ballu 75009 paris",
    weather_data: weather_data,
    start_latitude: 48.8648601,
    start_longitude: 2.3798866,
    end_latitude: 48.8821058,
    end_longitude: 2.3294068)
end
