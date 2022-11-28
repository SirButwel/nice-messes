class AddStartLongitudeAndStartLatitudeToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :start_longitude, :float
    add_column :users, :start_latitude, :float
  end
end
