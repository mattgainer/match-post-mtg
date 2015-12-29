class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.string :name
      t.integer :user_id
      t.integer :archetype_id
      t.boolean :removed, default: false

      t.timestamps null: false
    end
  end
end
