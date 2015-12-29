class DeckCard < ActiveRecord::Base
  belongs_to :deck
  
  def card
    Card.find(card_id)
  end
end
