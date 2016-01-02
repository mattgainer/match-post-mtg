class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @posts = Post.where("deck_id IN (?)", Deck.where(user_id: @user.id).pluck(:id)).order(:updated_at).limit(3)
  end
  
end
