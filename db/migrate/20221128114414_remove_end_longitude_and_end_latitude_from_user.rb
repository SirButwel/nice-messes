class RemoveEndLongitudeAndEndLatitudeFromUser < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :end_longitude, :float
    remove_column :users, :end_latitude, :float
  end
end
