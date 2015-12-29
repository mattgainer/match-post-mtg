class CreateArchetypes < ActiveRecord::Migration
  def change
    create_table :archetypes do |t|
      t.string :name
      t.integer :format_id
      t.boolean :removed, default: false

      t.timestamps null: false
    end
  end
end
