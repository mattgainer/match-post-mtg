class Api::V1::DecksController < ApplicationController
  def index
    @decks = Deck.all
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
  end
  def destroy
  end
end
