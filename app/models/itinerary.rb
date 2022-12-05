
class Itinerary < ApplicationRecord
  require 'open-uri'
  require 'time'
  require 'uri'
  require 'net/http'
  require 'json'


  TRANSPORT_MODES = { driving: 0, bicycling: 1, walking: 2 }
  enum :mode, TRANSPORT_MODES

  belongs_to :user
  # geocoded_by :start_address, start_latitude: :lat, start_longitude: :lon
  # geocoded_by :end_address, end_latitude: :lat, end_longitude: :lon
  # after_validation :geocode
  validates :start_address, presence: true
  validates :end_address, presence: true
  validates :mode, presence: true
  after_validation :get_insee_code

  private

  def get_insee_code
    unless start_address.empty? || end_address.empty?

      departure_zip_code = Geocoder.search(start_address).first.postal_code # on se sert des adresses de début et de fins pour récupérer les codes postaux
      arrival_zip_code = Geocoder.search(end_address).first.postal_code
      departure_insee_code = get_code(departure_zip_code) # on se sert des codes postaux pour récupérer les codes insee d'après le fichiers json dans pulic ( dossier)
      arrival_insee_code = get_code(arrival_zip_code)
      weather_api(arrival_insee_code) # on se sert des codes insee pour récup les données météo et on les sauvegarde
    end
  end

  def get_code(postal_code)
    json_file = JSON.parse(URI.open("public/full_insee_codes.json").read)
    insee_codes = json_file.select{ |element| element['fields']['postal_code'] == postal_code }
    if insee_codes.any?
      insee_code = insee_codes.first['fields']['insee_com']
    end
    insee_code
  end

  def weather_api(insee_code)

    url = "https://api.meteo-concept.com/api/forecast/daily/0?token=#{ENV['WEATHER_API_KEY']}&insee=#{insee_code}"

      URI.open("https://api.meteo-concept.com/api/forecast/daily/0?token=#{ENV['WEATHER_API_KEY']}&insee=35238") do |stream|
        city, forecast = JSON.parse(stream.read).values_at('city','forecast')
        p forecast
        update_weather_data(forecast)
      end
  end

  def update_weather_data(data)
    self.weather_data = data
  end

  before_save :calculate_itinerary

  def calculate_itinerary
    uri = URI.parse("https://maps.googleapis.com/maps/api/directions/json?origin=#{self.start_address.parameterize}&destination=#{self.end_address.parameterize}&mode=#{self.mode}&region=fr&departure_time=now&key=#{ENV['GOOGLE_API_KEY']}")
    res = Net::HTTP.get_response(uri)
    puts res.body if res.is_a?(Net::HTTPSuccess)
    data = JSON.parse(res.body)
    self.distance = data["routes"][0]["legs"][0]["distance"]["text"]
    self.duration = data["routes"][0]["legs"][0]["duration"]["text"]
    self.start_latitude = data["routes"][0]["legs"][0]["start_location"]["lat"]
    self.start_longitude = data["routes"][0]["legs"][0]["start_location"]["lng"]
    self.end_latitude = data["routes"][0]["legs"][0]["end_location"]["lat"]
    self.end_longitude = data["routes"][0]["legs"][0]["end_location"]["lng"]
    if data["routes"][0]["legs"][0]["duration_in_traffic"] != nil
      self.duration_in_traffic = data["routes"][0]["legs"][0]["duration_in_traffic"]["text"]
    else
      self.duration_in_traffic = nil
    end
  end
end
