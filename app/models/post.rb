class Post < ActiveRecord::Base
  belongs_to :deck
  belongs_to :archetype
  belongs_to :result
  has_many :post_comments

  def dates
    {create: created_at.strftime("%D"),update: updated_at.strftime("%D")}
  end

  def self.posts_by_format(user_id = User.all.pluck(:id))
    posts = {}
    user_id = [user_id] if user_id.class != Array
    Format.all.each do |format|
      posts["#{format.name.downcase}"] = Post.joins(deck: {archetype: :format}).where(formats: {name: format.name}, decks: {user_id: user_id, removed: false}, posts: {removed: false})
    end
    return posts
  end
end
