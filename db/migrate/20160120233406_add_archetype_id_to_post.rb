class AddArchetypeIdToPost < ActiveRecord::Migration
  def change
    add_column :posts, :archetype_id, :integer
  end
end
