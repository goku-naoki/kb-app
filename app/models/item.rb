class Item < ApplicationRecord

  has_many_attached :images

  with_options presence: true do
    validates :images
    validates :name
    validates :detail
    validates :price
  end
end
