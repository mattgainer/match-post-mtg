class AddQuantityToDeckCards < ActiveRecord::Migration
  def change
    add_column :deck_cards, :quantity, :integer
  end
end
