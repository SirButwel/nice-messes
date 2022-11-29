require 'open-uri'
require 'json'
require 'time'

class Itinerary < ApplicationRecord
  belongs_to :user
  before_save :weather_api
  geocoded_by :end_addressend

  private
  def weather_api

    url = "https://api.meteo-concept.com/api/forecast/daily/0?token=#{ENV['WEATHER_API_KEY']}&insee=#{destination_postcode}"

        URI.open("https://api.meteo-concept.com/api/forecast/daily/0?token=#{ENV['WEATHER_API_KEY']}&insee=35238") do |stream|
        city, forecast = JSON.parse(stream.read).values_at('city','forecast')
          p forecast
          update_weather_data(forecast)
      end


  end
  def update_weather_data(data)
    self.weather_data = data

  end

end
