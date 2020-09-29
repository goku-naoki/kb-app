class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # protect_from_forgery with: :null_session   #この記述でapiのエラー会場
  # protect_from_forgery :except => [:create] 
  before_action :new_cart
  helper_method :current_cart

  def current_cart 
  
    if session["cart_id"]
      @cart = Cart.find(session["cart_id"])
    else

      @cart = Cart.create
      session[:cart_id] = @cart.id
      @cart
    end
  end

  def new_cart
   if session["cart_id"] 
    cart=Cart.find_by(id:session["cart_id"])
     unless cart.present?
      @cart = Cart.create
      session[:cart_id] = @cart.id
      @cart
     end
   end
  end
end