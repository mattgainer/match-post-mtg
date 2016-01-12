class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.where(removed: false)
  end
  def show
    @post = Post.find(params[:id])
  end
  def create
    @post = Post.new(result_id: params[:result_id], archetype_id: params[:archetype_id], deck_id: params[:deck_id], post_text: params[:post_text])
    if @post.save
      render :show
    else
      render json: {errors: @post.errors.full_messages}
    end
  end
  def update
  end
  def destroy
  end
end
