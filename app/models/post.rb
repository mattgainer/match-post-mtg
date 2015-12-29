class Post < ActiveRecord::Base
  belongs_to :deck
  belongs_to :archetype

  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end

  def self.posts_by_format(user_id = User.all.pluck(:id))
    posts = {}
    user_id = [user_id] if user_id.class != Array
    Format.all.each do |format|
      posts["#{format.name.downcase}"] = Post.where("deck_id IN (?)",
      Deck.where("archetype_id IN (?) AND user_id IN (?)",
        Archetype.where(format_id: format.id).pluck(:id), user_id
        ).pluck(:id)).order(:updated_at).limit(3)
    end
    return posts
  end
end
