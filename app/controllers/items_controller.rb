class ItemsController < ApplicationController

  before_action :no_admin, except: [:index,:show]
  def index
    @items=Item.all
    if request.fullpath.include?("admin")
      no_admin and return
      @paths=[]
      @items.each do |item|
        path=admin_item_path(current_admin.id,item.id)
        @paths<<path
      end
      render layout: 'admin'
    else
      @paths=[]
      @items.each do |item|
       path=item_path(item.id)
       @paths<<path
      end
    
    end
  end 

  def show
    @item=Item.find(params[:id])
      if @cart_in_this=@item.cart_items.find_by(cart_id: session['cart_id'])
        @cart_in_this
      end
    if request.fullpath.include?("admin")
      no_admin and return
      render layout: 'admin'
    end
   
  end

  def new
    @item=Item.new
    @label_count=0
    render layout: 'admin' 
  end

  def create
    
    @item=Item.new(item_params)
    if @item.save
      redirect_to admin_items_path(current_admin.id)
    else
      render layout: 'admin', action: :new
    end
  end

  def edit
    @item=Item.find(params[:id])
    @label_count=@item.images.length
    render layout: 'admin'
  end
  
  def update
    @item=Item.find(params[:id])
    if @item.update(item_params)
      redirect_to  admin_items_path(current_admin.id)
    else
      render  render layout: 'admin', action: :edit
    end
  end

  def destroy
    admin_id=current_admin.id
    item=Item.find(params[:id])
    item.update(hide:true)
    render json: admin_id

  end

  private

  def item_params
    params.require(:item).permit(:name,:detail,:price,images:[])
  end

  def no_admin
    unless admin_signed_in?
      redirect_to new_admin_session_path 
    end
  end
  
end
