class AddImageUrlToItinerary < ActiveRecord::Migration[7.0]
  def change
    add_column :itineraries, :image_url, :string
  end
end
