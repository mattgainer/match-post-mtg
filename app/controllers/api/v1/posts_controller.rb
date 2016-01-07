class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.all
  end
  def show
    @post = Post.find(params[:id])
  end
  def create
  end
  def update
  end
  def destroy
  end
end
