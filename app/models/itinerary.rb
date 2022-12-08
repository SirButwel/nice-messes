class Itinerary < ApplicationRecord
  require 'open-uri'
  require 'time'
  require 'uri'
  require 'net/http'
  require 'json'

  TRANSPORT_MODES = { driving: 0, bicycling: 1, walking: 2 }
  enum :mode, TRANSPORT_MODES

  belongs_to :user
  has_one_attached :image
  # geocoded_by :start_address, start_latitude: :lat, start_longitude: :lon
  # geocoded_by :end_address, end_latitude: :lat, end_longitude: :lon
  # after_validation :geocode
  validates :start_address, presence: true
  validates :end_address, presence: true
  # validates :mode, presence: true
  after_validation :get_insee_code

  def duration_in_minutes
    duration_hash = duration.split.reverse.each_slice(2).to_h
    hours = duration_hash["hours"] || duration_hash["hour"]
    days = duration_hash["days"] || duration_hash["day"]
    minutes = duration_hash["mins"] || duration_hash["min"]

    return (days.to_i * 1440) + (hours.to_i * 60) + minutes.to_i
  end

  private

  def get_insee_code
    unless start_address.empty? || end_address.empty?

      departure_zip_code = Geocoder.search(start_address).first.data["address"]["postcode"]
      arrival_zip_code = Geocoder.search(end_address).first.data["address"]["postcode"]
      departure_insee_code = get_code(departure_zip_code)

      arrival_insee_code = get_code(arrival_zip_code)
      weather_api(arrival_insee_code)
      # on se sert des codes insee pour récup les données météo et on les sauvegarde
    end
  end

  def get_code(postal_code)
    json_file = JSON.parse(URI.open("public/full_insee_codes.json").read)
    insee_codes = json_file.select { |element| element['fields']['postal_code'] == postal_code }
    insee_code = insee_codes.first['fields']['insee_com'] if insee_codes.any?
    insee_code
  end

  def weather_api(insee_code)
    url = "https://api.meteo-concept.com/api/forecast/daily/0?token=#{ENV.fetch('WEATHER_API_KEY',
                                                                                nil)}&insee=#{insee_code}"

    URI.open(url) do |stream|
      city, forecast = JSON.parse(stream.read).values_at('city', 'forecast')
      p forecast
      update_weather_data(forecast)
    end
  end

  def update_weather_data(data)
    self.weather_data = data
  end

  before_save :calculate_itinerary

  def calculate_itinerary
    uri = URI.parse("https://maps.googleapis.com/maps/api/directions/json?origin=#{start_address.parameterize}&destination=#{end_address.parameterize}&mode=#{mode}&region=fr&departure_time=now&key=#{ENV.fetch(
      'GOOGLE_API_KEY', nil
    )}")
    res = Net::HTTP.get_response(uri)
    puts res.body if res.is_a?(Net::HTTPSuccess)
    data = JSON.parse(res.body)
    self.distance = data["routes"][0]["legs"][0]["distance"]["text"]
    self.duration = data["routes"][0]["legs"][0]["duration"]["text"]
    self.start_latitude = data["routes"][0]["legs"][0]["start_location"]["lat"]
    self.start_longitude = data["routes"][0]["legs"][0]["start_location"]["lng"]
    self.end_latitude = data["routes"][0]["legs"][0]["end_location"]["lat"]
    self.end_longitude = data["routes"][0]["legs"][0]["end_location"]["lng"]
    if data["routes"][0]["legs"][0]["duration_in_traffic"].nil?
      self.duration_in_traffic = nil
    else
      self.duration_in_traffic = data["routes"][0]["legs"][0]["duration_in_traffic"]["text"]
    end
  end
end
