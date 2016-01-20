class Deck < ActiveRecord::Base
  belongs_to :user
  belongs_to :archetype
  has_many :posts
  has_many :deck_cards
  has_many :deck_comments
  has_many :deck_ratings
  
  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end
  def self.decks_by_format(user_id = User.all.pluck(:id))
    decks = {}
    user_id = [user_id] if user_id.class != Array
    Format.all.each do |format|
      decks["#{format.name}"] = Deck.joins(archetype: :format).where(formats: {name: format.name}, decks: {user_id: user_id, removed: false}).order(:updated_at).limit(3)
    end
    return decks
  end
end
