class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.joins(:deck).where(posts: {removed: false}, decks: {removed: false})
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
    @post = Post.find(params[:id])
    @post.attributes = {post_text: params[:post_text]}
    if @post.save
      render :show
    else
      
    end
  end
  def destroy
  end
  def search
    @posts = Post.joins(:deck).where(posts: {removed: false}, decks: {removed: false})
  end
end
