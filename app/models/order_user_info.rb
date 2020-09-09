class OrderUserInfo < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions

  belongs_to_active_hash :prefecture
  has_one :order,dependent: :destroy
end
