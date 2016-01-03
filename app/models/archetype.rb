class Archetype < ActiveRecord::Base
  belongs_to :format
  has_many :decks
  has_many :posts
  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end
end
