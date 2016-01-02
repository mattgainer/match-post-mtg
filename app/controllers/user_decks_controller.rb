class UserDecksController < ApplicationController
  before_action :authenticate_correct_user_for_decks!, only: [:show]
  def index
    @decks = Deck.where(user_id: params[:user_id])
  end
  def show
  end
end
