class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.integer :wins
      t.integer :losses
      t.timestamps null: true
    end
  end
end
