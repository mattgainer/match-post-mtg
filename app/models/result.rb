class Result < ActiveRecord::Base
  def text_result
    "#{wins}-#{losses}"
  end
end
