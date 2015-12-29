class Deck < ActiveRecord::Base
  belongs_to :user
  belongs_to :archetype
  has_many :posts
  has_many :deck_cards
  
  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end
end
