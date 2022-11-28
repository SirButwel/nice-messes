class CreateItineraries < ActiveRecord::Migration[7.0]
  def change
    create_table :itineraries do |t|
      t.string :start_address
      t.string :end_address
      t.float :start_latitude
      t.float :start_longitude
      t.float :end_latitude
      t.float :end_longitude
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
