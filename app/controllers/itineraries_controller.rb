class ItinerariesController < ApplicationController
  before_action :set_itinerary, only: %i[show destroy update]
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

  def update
    decoded_data = Base64.decode64(params[:image_blob].split(',')[1])
    @itinerary.image.attach(
      io: StringIO.new(decoded_data),
      content_type: 'image/jpeg',
      filename: 'image.jpg'
    )
  end

  private

  def set_itinerary
    @itinerary = Itinerary.find(params[:id])
  end

  def itinerary_params
    params.require(:itinerary).permit(:start_address, :end_address, :start_latitude, :start_longitude, :end_latitude, :end_longitude, :distance, :duration, :image_url)
  end
end
