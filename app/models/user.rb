class User < ActiveRecord::Base

  belongs_to :user_type
  has_many :decks
  has_many :post_comments
  has_many :deck_comments
  has_many :post_ratings
  has_many :deck_ratings
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  validates :username, :first_name, :last_name, presence:true
  validates :username, uniqueness: true

  def full_name
    "#{first_name} #{last_name}"
  end



  def admin?
    if user_type_id == 1
      true
    else
      false
    end
  end

end
