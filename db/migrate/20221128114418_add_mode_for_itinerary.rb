class AddModeForItinerary < ActiveRecord::Migration[7.0]
  def change
    add_column :itineraries, :mode, :integer
  end
end
