class Api::V1::DecksController < ApplicationController
  def index
    @decks = Deck.where(removed: false)
  end
  def show
    @deck = Deck.find(params[:id])
  end
  def create
    @deck = Deck.new(name: params[:name], archetype_id: params[:archetype_id], user_id: params[:user_id])
    if @deck.save
      render :show
    else

    end
  end
  def update
    @deck = Deck.find(params[:id])
    @deck.attributes = {name: params[:name], archetype_id: params[:archetype_id]}
    if @deck.save
      render :show
    else

    end
  end
  def destroy
    @deck = Deck.find(params[:id])
    @deck.update(removed: true)
    @decks = Deck.where(removed: false)
    render :index
  end
  def search
    @decks = Deck.where(removed: false)
  end
end
