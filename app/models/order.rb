class Order < ApplicationRecord
  belongs_to :order_user_info
  has_many :order_items
end
