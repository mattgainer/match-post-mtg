class Api::V1::DecksController < ApplicationController
  def index
    @decks = Deck.all
  end
  def show
    @deck = Deck.find(params[:id])
  end
  def create
  end
  def update
  end
  def destroy
  end
end
