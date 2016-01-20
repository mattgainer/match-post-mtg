class CreatePostRatings < ActiveRecord::Migration
  def change
    create_table :post_ratings do |t|
      t.integer :rating
      t.integer :post_id
      t.integer :user_id

      t.timestamps null: true
    end
  end
end
