class Api::V1::PostRatingsController < ApplicationController
  def index
    @ratings = PostRating.all
    if params[:post_id]
      @ratings = PostRating.where(post_id: params[:post_id])
    end
  end
  def show
    @rating = PostRating.find(params[:id])
  end
  def create
    @rating = PostRating.new(rating: params[:rating], user_id: params[:user_id], post_id: params[:post_id])
    if @rating.save
      render :show
    else

    end
  end
  def update
    @rating = PostRating.find(params[:id])
    @rating.attributes = {rating: params[:rating]}
    if @rating.save
      render :show
    else

    end
  end
  def destroy
    @rating = PostRating.find(params[:id])
    @rating.destroy
  end
end
