class Item < ApplicationRecord

  has_one_attached :image

  with_options presence: true do
    validates :image
    validates :name
    validates :detail
    validates :price
  end
end
