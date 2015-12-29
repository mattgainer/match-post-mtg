class Archetype < ActiveRecord::Base
  belongs_to :format
  has_many :decks
  has_many :posts
end
