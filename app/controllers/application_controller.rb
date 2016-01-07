class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :first_name, :last_name, :password) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation, :current_password) }
  end

  private

  def authenticate_admin!
    redirect_to "/" unless current_user && current_user.admin?
  end

  def authenticate_their_deck!
    redirect_to "/" unless Deck.find(params[:id]).user_id == current_user.id
  end
  def authenticate_their_post!
    redirect_to "/" unless Post.find(params[:id]).deck.user.id == params[:user_id]
  end
  def authenticate_correct_user_for_decks!
    redirect_to "/users/#{params[:user_id]}" unless Deck.find(params[:id]).user_id == params[:user_id]
  end
  def authenticate_correct_user_for_posts!
    redirect_to "/users/#{params[:user_id]}" unless Post.find(params[:id]).deck.user_id == params[:user_id]
  end
end
