class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @posts = Post.joins(deck: :user).where(users: {id: @user.id}, decks: {removed: false}, posts: {removed: false})
  end
  
end
