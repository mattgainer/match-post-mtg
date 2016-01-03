class Format < ActiveRecord::Base
  has_many :archetypes

  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end
end
