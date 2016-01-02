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
      posts["#{format.name.downcase}"] = Post.joins(deck: {archetype: :format}).where(formats: {name: format.name}, decks: {user_id: user_id})
    end
    return posts
  end
end
