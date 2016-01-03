class DeckCard < ActiveRecord::Base
  belongs_to :deck
  
  def card
    Card.find(card_id)
  end
  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end
end