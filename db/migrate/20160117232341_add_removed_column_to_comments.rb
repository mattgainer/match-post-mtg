class AddRemovedColumnToComments < ActiveRecord::Migration
  def change
    add_column :deck_comments, :removed, :boolean, default: false
    add_column :post_comments, :removed, :boolean, default: false
  end
end
