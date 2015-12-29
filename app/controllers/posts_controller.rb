class PostsController < ApplicationController
  def index
    @posts = Post.posts_by_format
  end
  def show
    @post = Post.find(params[:id])
    @comments = []
  end
end
