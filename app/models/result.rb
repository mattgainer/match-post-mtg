class Result < ActiveRecord::Base
  has_many :posts
  def text_result
    "#{wins}-#{losses}"
  end
end
