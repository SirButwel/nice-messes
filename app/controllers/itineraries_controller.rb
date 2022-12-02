class ItinerariesController < ApplicationController
  before_action :set_itinerary, only: %i[show destroy]
  def new
    @itinerary = Itinerary.new
  end

  def create
    @itinerary = Itinerary.new(itinerary_params)
    @itinerary.mode = params[:itinerary][:mode].to_i
    @itinerary.user = current_user
    @itinerary.save
    if @itinerary.save
      redirect_to itinerary_path(@itinerary)
    else
      redirect_to images_path, notice: "You must add start, arrival end transportation mode"
    end
  end

  def index
    @itineraries = Itinerary.all
  end

  def show
    @image = Image.where(itinerary_id: params[:id])

    @markers =
    [
      lat: @itinerary.start_latitude,
      lng: @itinerary.start_longitude
    ]
  end

  def destroy
    @itinerary.destroy
    redirect_to itineraries_path, status: :see_other
  end

  private

  def set_itinerary
    @itinerary = Itinerary.find(params[:id])
  end

  def itinerary_params
    params.require(:itinerary).permit(:start_address, :end_address, :start_latitude, :start_longitude, :end_latitude, :end_longitude, :distance, :duration,)
  end
end
