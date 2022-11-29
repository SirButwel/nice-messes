class Itinerary < ApplicationRecord
  require 'uri'
  require 'net/http'
  require 'json'

  belongs_to :user
  before_save :calculate_itinerary

  private

  def calculate_itinerary
    uri = URI("https://maps.googleapis.com/maps/api/directions/json?origin=#{self.start_address}&destination=#{self.end_address}&mode=#{self.mode}&region=fr&departure_time=now&key=#{ENV['GOOGLE_API_KEY']}")
    res = Net::HTTP.get_response(uri)
    puts res.body if res.is_a?(Net::HTTPSuccess)
    data = JSON.parse(res.body)
    # raise
    self.distance = data["routes"][0]["legs"][0]["distance"]["text"]
    self.duration = data["routes"][0]["legs"][0]["duration"]["text"]
    self.start_latitude = data["routes"][0]["legs"][0]["start_location"]["lat"]
    self.start_longitude = data["routes"][0]["legs"][0]["start_location"]["lng"]
    self.end_latitude = data["routes"][0]["legs"][0]["end_location"]["lat"]
    self.end_longitude = data["routes"][0]["legs"][0]["end_location"]["lng"]
  end
end
