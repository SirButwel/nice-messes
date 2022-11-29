class AddDurationAndDistanceToItinerary < ActiveRecord::Migration[7.0]
  def change
    add_column :itineraries, :duration, :string
    add_column :itineraries, :distance, :string
  end
end
