class UserType < ActiveRecord::Base
  has_many :users

  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end
end
