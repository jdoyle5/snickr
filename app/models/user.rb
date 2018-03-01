# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  img_url         :string
#

class User < ApplicationRecord
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token

  has_many :photos,
    primary_key: :id,
    foreign_key: :owner_id,
    class_name: :Photo

  has_many :comments,
    primary_key: :id,
    foreign_key: :owner_id,
    class_name: :Comment

  has_many :likes,
    primary_key: :id,
    foreign_key: :owner_id,
    class_name: :Like

  has_many :followers,
    primary_key: :id,
    foreign_key: :follower_id,
    class_name: :Follow

  has_many :followees,
    primary_key: :id,
    foreign_key: :followee_id,
    class_name: :Follow

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_new_session_token
    save!
    self.session_token
  end

  private

  def ensure_session_token
    generate_new_session_token unless self.session_token
  end

  def generate_new_session_token
    self.session_token = SecureRandom.urlsafe_base64
    while User.find_by(session_token: self.session_token)
      self.session_token = SecureRandom.urlsafe_base64
    end
    self.session_token
  end
end
