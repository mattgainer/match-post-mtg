class AddResultIdToPost < ActiveRecord::Migration
  def change
    add_column :posts, :result_id, :integer
  end
end
