class ItinerariesController < ApplicationController

  def new
    @itinerary = Itinerary.new
  end

  def create
    @itinerary = Itinerary.new(itinerary_params)
    @itinerary.user = current_user
    @itinerary.save
    redirect_to itinerary_path(@itinerary)
  end

  def index
    @itineraries = Itinerary.all
  end

  def show
    @itinerary = Itinerary.find(params[:id])
    @image = Image.where(itinerary_id: params[:id])

    @markers =
    [
      lat: @itinerary.start_latitude,
      lng: @itinerary.start_longitude
    ]
  end

  private

  def itinerary_params
    params.require(:itinerary).permit(:start_address, :end_address, :start_latitude, :start_longitude, :end_latitude, :end_longitude, :distance, :duration, :mode)
  end

end
