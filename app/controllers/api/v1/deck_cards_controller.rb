class Api::V1::DeckCardsController < ApplicationController
  def index
    @deck_cards = DeckCard.where(deck_id: params[:deck_id])
  end
  def show
    @deck_card = DeckCard.find(params[:id])
  end
  def create
    @deck_card = DeckCard.new(deck_id: params[:deck_id], card_id: params[:card_id], quantity: params[:quantity])
    if params[:key_card]
      @deck_card.attributes = {key_card: params[:key_card]}
    end
    if @deck_card.save
      render :show
    else

    end
  end
  def update
  end
  def destroy
  end
end
