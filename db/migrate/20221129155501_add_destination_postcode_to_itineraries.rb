class AddDestinationPostcodeToItineraries < ActiveRecord::Migration[7.0]
  def change
    add_column :itineraries, :destination_postcode, :string
  end
end
