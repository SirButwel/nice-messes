class AddDurationInTrafficInItinerary < ActiveRecord::Migration[7.0]
  def change
    add_column :itineraries, :duration_in_traffic, :string
  end
end
