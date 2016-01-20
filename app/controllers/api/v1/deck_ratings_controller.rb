class Api::V1::DeckRatingsController < ApplicationController
  def index
    @ratings = DeckRating.all
    if params[:deck_id]
      @ratings = DeckRating.where(deck_id: params[:deck_id])
    end
  end
  def show
    @rating = DeckRating.find(params[:id])
  end
  def create
    @rating = DeckRating.new(rating: params[:rating], user_id: params[:user_id], deck_id: params[:deck_id])
    if @rating.save
      render :show
    else

    end
  end
  def update
    @rating = DeckRating.find(params[:id])
    @rating.attributes = {rating: params[:rating]}
    if @rating.save
      render :show
    else

    end
  end
  def destroy
    @rating = DeckRating.find(params[:id])
    @rating.destroy
  end
end
