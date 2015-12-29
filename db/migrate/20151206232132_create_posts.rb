class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :deck_id
      t.text :post_text
      t.boolean :removed, default: false

      t.timestamps null: false
    end
  end
end
