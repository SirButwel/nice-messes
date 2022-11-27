class AddEndLongitudeAndEndLatitudeToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :end_longitude, :float
    add_column :users, :end_latitude, :float
  end
end
