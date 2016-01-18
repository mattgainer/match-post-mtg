class AddIdFieldsToComments < ActiveRecord::Migration
  def change
    add_column :deck_comments, :deck_id, :integer
    add_column :post_comments, :post_id, :integer
  end
end
