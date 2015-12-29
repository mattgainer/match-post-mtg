class CreateDeckCards < ActiveRecord::Migration
  def change
    create_table :deck_cards do |t|
      t.integer :deck_id
      t.integer :card_id
      t.boolean :removed, default: false

      t.timestamps null: false
    end
  end
end
