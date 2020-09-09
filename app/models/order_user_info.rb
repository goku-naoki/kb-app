class OrderUserInfo < ApplicationRecord
  has_one :order,dependent: :destroy
end
