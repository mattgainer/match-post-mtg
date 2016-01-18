class CreateDeckComments < ActiveRecord::Migration
  def change
    create_table :deck_comments do |t|
      t.integer :user_id
      t.text :comment_text

      t.timestamps null: false
    end
  end
end
