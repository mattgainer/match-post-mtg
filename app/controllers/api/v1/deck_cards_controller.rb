class Api::V1::DeckCardsController < ApplicationController
  def index
    @deck_cards = DeckCard.where(deck_id: params[:deck_id], removed: false)
  end
  def show
    @deck_card = DeckCard.find(params[:id])
  end
  def create
    @deck_card = DeckCard.new(deck_id: params[:deck_id], card_id: params[:card_id], quantity: params[:quantity])
    if params[:key_card]
      @deck_card.attributes = {key_card: params[:key_card]}
    end
    if params[:sideboard]
      @deck_card.attributes = {sideboard: params[:sideboard]}
    end
    if @deck_card.save
      render :show
    else

    end
  end
  def update
    @deck_card = DeckCard.find(params[:id])
    @deck_card.attributes = {card_id: params[:card_id], quantity: params[:quantity]}
    if @deck_card.key_card && !params[:key_card]
      @deck_card.attributes = {key_card: false}
    elsif params[:key_card]
      @deck_card.attributes = {key_card: params[:key_card]}
    end
    if @deck_card.sideboard && !params[:sideboard]
      @deck_card.attributes = {sideboard: false}
    elsif params[:sideboard]
      @deck_card.attributes = {sideboard: params[:sideboard]}
    end
    if @deck_card.save
      render :show
    else

    end
  end
  def destroy
    @deck_card = DeckCard.find(params[:id])
    @deck_card.destroy
    render :index
  end
end
