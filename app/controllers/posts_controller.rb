class PostsController < ApplicationController
  before_action :check_post_removed!, only: [:show, :edit]
  def index
    @posts = Post.posts_by_format
  end
  def show
    @post = Post.find(params[:id])
    @comments = []
  end
  def create
    @post = Post.new(archetype_id: params[:archetype][:archetype_id], result_id: params[:result][:result_id], post_text: params[:post_text], deck_id: params[:deck][:deck_id])
    if @post.save
      redirect_to "/posts/#{@post.id}"
    else
      render :new
    end
  end
  def edit
    @post = Post.find(params[:id])
  end
  def destroy
    @post = Post.find(:id).update(removed: true)
    redirect_to "/"
  end
end
