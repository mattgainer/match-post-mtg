class Api::V1::DeckCardsController < ApplicationController
  def index
    @deck_cards = DeckCard.where(deck_id: params[:deck_id])
  end
  def show
    @deck_card = DeckCard.find(params[:id])
  end
  def create
  end
  def update
  end
  def destroy
  end
end
