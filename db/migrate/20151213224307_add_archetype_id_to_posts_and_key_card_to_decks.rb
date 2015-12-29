class AddArchetypeIdToPostsAndKeyCardToDecks < ActiveRecord::Migration
  def change
    add_column :deck_cards, :key_card, :boolean, default: false
  end
end
