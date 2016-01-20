class CreateDeckRatings < ActiveRecord::Migration
  def change
    create_table :deck_ratings do |t|
      t.integer :rating
      t.integer :deck_id
      t.integer :user_id

      t.timestamps null: true
    end
  end
end
