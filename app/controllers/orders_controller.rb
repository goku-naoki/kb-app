class OrdersController < ApplicationController

  before_action :back_to_shop, only: [:order_confirmation,:order_pay]
  before_action :no_admin, only: [:index,:show]

  def index
    @orders=Order.all
    render layout: 'admin' 
  end

  def show
    order=Order.find(params[:id])
    @order_info=order.order_user_info
    @order_items=order.order_items
    render layout: 'admin' 
  end

  def new
    @order_info=OrderInfo.new
  end

  def create
    @order_info=OrderInfo.new(order_params)
    if @order_info.valid?
      session[:mgk]=@order_info
      redirect_to  order_confirmation_path
    else
      binding.pry
      flash[:danger] =  @order_info.errors.full_messages
      redirect_to action: :new
    end
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

    value=session[:mgk]
    @order_info=OrderInfo.new(first_name:value["first_name"], 
                              last_name:value["last_name"], 
                              first_name_kana:value["first_name_kana"], 
                              last_name_kana:value["last_name"],
                              postal_code:value["postal_code"], 
                              prefecture_id:value["prefecture_id"],
                              city:value["city"],
                              addresses:value["addresses"],
                              building:value["building"],
                              phone_number:value["phone_number"],
                              email:value["email"],
                              cart_id:value["cart_id"]
                            )
    if @order_info.valid?
       @order_info.save
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



      private

      def back_to_shop
        unless session[:mgk]
          redirect_to items_path
        end
      end

      def no_admin
        unless admin_signed_in?
          redirect_to new_admin_session_path 
        end
      end
end
