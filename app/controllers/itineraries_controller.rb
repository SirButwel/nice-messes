class ItinerariesController < ApplicationController

  def new
    @itinerary = Itinerary.new
  end

  def create

  end

  def index
    @itineraries = Itinerary.all
  end

  def show
    @itinerary = Itinerary.find(params[:id])
    @image = Image.where(itinerary_id: params[:id])
  end


  private

  def itinerary_params
    params.require(:itinerary).permit(:start_address, :end_address, :start_latitude, :start_longitude, :end_latitude, :end_longitude)
  end

end
