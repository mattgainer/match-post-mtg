class DecksController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :authenticate_their_deck!, only: [:update, :create]
  def index
    
  end

  def show
    @deck = Deck.find(params[:id])
  end

  def new
    @deck = Deck.new
  end

  def create
    @deck = Deck.new(deck_params)
    @deck.attributes(user_id: current_user.id)
    if @deck.save
      redirect_to "/decks/#{@deck.id}"
    else
      render :new
    end
  end

  def edit
    @deck = Deck.find(params[:id])
  end

  def update
    @deck = Deck.new(deck_params)

  end

  def destroy

  end

  private

  def deck_params
    params.require(:archetype).permit(:id, :name, :user_id, :removed, :archetype_id)
  end
end
