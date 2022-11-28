class Itinerary < ApplicationRecord
require 'uri'
require 'net/http'
require 'json'


  belongs_to :user
  after_save :calculate_itinerary

  private

  def calculate_itinerary

    uri = URI("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=#{ENV['GOOGLE_API_KEY']}")
    res = Net::HTTP.get_response(uri)
    puts res.body if res.is_a?(Net::HTTPSuccess)
    data = JSON.parse(res.body)
    #  extraire l information pertinente et la persister sur l itineraire
    raise
  end
end
