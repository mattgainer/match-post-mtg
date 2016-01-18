class DeckComment < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user
  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end
end
