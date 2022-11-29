class Itinerary < ApplicationRecord
require 'uri'
require 'net/http'
require 'json'


  belongs_to :user
  before_save :calculate_itinerary

  private

  def calculate_itinerary

    uri = URI("https://maps.googleapis.com/maps/api/directions/json?origin=#{self.start_address}&destination=#{self.end_address}&mode=#{self.mode}&departure_time=now&key=#{ENV['GOOGLE_API_KEY']}")
    res = Net::HTTP.get_response(uri)
    puts res.body if res.is_a?(Net::HTTPSuccess)
    data = JSON.parse(res.body)
    #  extraire l information pertinente et la persister sur l itineraire
    # raise
    self.distance = data["routes"][0]["legs"][0]["distance"]["text"]
    self.duration = data["routes"][0]["legs"][0]["duration"]["text"]
    # coordonner de départ = data["routes"][0]["legs"][0]["start_location"]
    # coordonner d'arriver = data["routes"][0]["legs"][0]["end_location"]

  end
end
