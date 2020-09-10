class OrdersController < ApplicationController

  def new
    @order_info=OrderInfo.new
  end

  def create
    @order_info=OrderInfo.new(order_params)
    session[:mgk]=@order_info
   
    # @order_info.save
    redirect_to  order_confirmation_path
   
  end

  def order_confirmation
    @postal=session[:mgk]['postal_code']
    @prefecture=Prefecture.find(session[:mgk]['prefecture_id']).name
    @city=session[:mgk]['city']
    @addresses=session[:mgk]['addresses']
    @building=session[:mgk]['building'] if session[:mgk]['building'] !=nil
    @last_name=session[:mgk]['last_name']
    @first_name=session[:mgk]['first_name']
    @last_name_kana=session[:mgk]['last_name_kana']
    @first_name_kana=session[:mgk]['first_name_kana']
    @phone_number=session[:mgk]['phone_number']
    @email=session[:mgk]['email']
    @cart_items=Cart.find(session[:mgk]['cart_id']).cart_items
    session[:amount]=0

    @cart_items.each do |cart_item|
      session[:amount] +=cart_item.item.price
    end

  end

  def order_pay
    @order_info=OrderInfo.new(session[:mgk])
    if @order_info.valid?
       @order_info.save
       binding.pry
         pay
        current_cart.destroy
        session.clear
       

    end

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

    def pay
      Payjp.api_key ="sk_test_242fc517b65b2f9898303b6d"
      Payjp::Charge.create(
        amount: session[:amount],
        card: params[:token],
        currency: 'jpy'
      )
      end
end
