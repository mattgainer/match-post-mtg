class AddArchetypeIdToPost < ActiveRecord::Migration
  def change
    add_column :posts, :archeytpe_id, :integer
  end
end
