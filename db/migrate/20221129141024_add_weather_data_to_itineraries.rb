class AddWeatherDataToItineraries < ActiveRecord::Migration[7.0]
  def change
    add_column :itineraries, :weather_data, :string
  end
end
