class PostComment < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end
end
