class UserPostsController < ApplicationController
  before_action :authenticate_their_post!, except: [:index]
  def index
    @posts = Post.posts_by_format(params[:user_id])
  end
  def show
    @post = Post.find(params[:id])
    @comments = []
  end
end
