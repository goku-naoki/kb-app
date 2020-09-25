class AdminsController < ApplicationController
  before_action :no_admin
  def index
  
    render layout: 'admin' 
  end

  def show
  
    render layout: 'admin' 
  end


  private

  def no_admin
    unless admin_signed_in?
      redirect_to new_admin_session_path
    end
  end
end
