class OrderInfo
  include ActiveModel::Model

  attr_accessor :first_name,:last_name,:first_name_kana,:last_name_kana,:postal_code,:prefecture_id,:city,:addresses,:building,:phone_number,:email,:cart_id
  
  validates :first_name,:last_name,:first_name_kana,:last_name_kana,:postal_code,:prefecture_id,:city,:addresses,:phone_number,:email,:cart_id,presence: true


  def save
  
    order_user_info=OrderUserInfo.create(first_name:first_name, last_name:last_name, first_name_kana:first_name_kana, last_name_kana:last_name,postal_code:postal_code, prefecture_id:prefecture_id, city:city, addresses:addresses,building:building,phone_number:phone_number,email:email)
    order=Order.create(order_user_info_id:order_user_info.id)
    
    cart_items=Cart.find(cart_id).cart_items
    cart_items.each do |cart_item|
      OrderItem.create(order_id:order.id,quantity:cart_item.quantity,item_id:cart_item.item_id)
    end
  end
end