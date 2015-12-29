module PostsHelper
  def card_count(array)
    final = {}
    array.each do |element|
      if final[element.card.name]
        final[element.card.name] += 1
      else
        final[element.card.name] = 1
      end
    end
    return final
  end
end
