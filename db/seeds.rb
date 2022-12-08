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

@andris = User.new(
  first_name: "andris",
  last_name: "andris",
  email: "andris@mail.com",
  password: "Password"
)
@andris.save!


2.times do
  @weather_data = "{\"insee\"=>\"75101\", \"cp\"=>75001, \"latitude\"=>48.8626, \"longitude\"=>92.3363, \"day\"=>0, \"datetime\"=>\"2022-12-08T01:00:00+0100\", \"wind10m\"=>0, \"gust10m\"=>21, \"dirwind10m\"=>47, \"rr10\"=>0, \"rr1\"=>0, \"probarain\"=>10, \"weather\"=>1, \"tmin\"=>0, \"tmax\"=>#{rand(10..30)}, \"sun_hours\"=>3, \"etp\"=>0, \"probafrost\"=>100, \"probafog\"=>80, \"probawind70\"=>0, \"probawind100\"=>0, \"gustx\"=>21}"

  puts 'Create test itinerary'

  @itinerary = Itinerary.new(start_address: "Paris, France", end_address: "Bordeaux, Gironde, France",
  mode: "driving")
  @itinerary.user = @andris
  @itinerary.weather_data = @weather_data
  @itinerary.save!

  @itinerary = Itinerary.new(start_address: "Paris, France", end_address: "Corse-du-Sud, France",
  mode: "driving")
  @itinerary.user = @andris
  @itinerary.weather_data = @weather_data
  @itinerary.save!
end
