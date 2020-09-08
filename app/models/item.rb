class Item < ApplicationRecord

  has_many_attached :images
  
  has_many :cart_items

  with_options presence: true do
    validates :images
    validates :name
    validates :detail
    validates :price
  end
end
