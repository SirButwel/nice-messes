class RemoveStartLongitudeAndStartLatitudeFromUser < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :start_longitude, :float
    remove_column :users, :start_latitude, :float
  end
end
