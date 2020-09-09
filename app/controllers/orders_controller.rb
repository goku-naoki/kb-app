class OrdersController < ApplicationController

  def new
    @order_info=OrderInfo.new
  end

  def create
    @order_info=OrderInfo.new(order_params)
    @order_info.valid?
    @order_info.save
    redirect_to root_path
  end

  private

  def order_params
    params.permit(:first_name,
                  :last_name,
                  :first_name_kana,
                  :last_name_kana,
                  :postal_code,
                  :prefecture_id,
                  :city,
                  :addresses,
                  :building,
                  :phone_number,
                  :email,
                  :cart_id
                )
  end
end
