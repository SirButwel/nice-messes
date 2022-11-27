class ImagesController < ApplicationController
  def index
    @images = Image.all
    @itinerary = Itinerary.new
  end
end
