class DecksController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :authenticate_their_deck!, only: [:update, :create]
  def index
    @decks = Deck.decks_by_format
  end

  def show
    @deck = Deck.find(params[:id])
    @comments = []
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

  end

  def destroy
    Deck.find(params[:id]).update(removed: true)
  end

  private

  def deck_params
    params.require(:archetype).permit(:id, :name, :user_id, :removed, :archetype_id)
  end
end
