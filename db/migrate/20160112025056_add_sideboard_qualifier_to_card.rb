class AddSideboardQualifierToCard < ActiveRecord::Migration
  def change
    add_column :deck_cards, :sideboard, :boolean, default: false
  end
end
