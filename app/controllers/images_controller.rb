class ImagesController < ApplicationController
  def index
    @images = Image.all
    @itinerary = Itinerary.new
  end

  def new
    @image = Image.new
  end

  def create
  @image = Image.new(params[:image_url])
  @itineray.user = current_user
  @itinerary.save
  end

end
