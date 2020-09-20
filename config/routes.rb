Rails.application.routes.draw do
  devise_for :admins, controllers: {
    sessions: 'admins/sessions'
  }

  root to: "home#index"
  resources :profiles, only: [:index]
  resources :barber, only: [:index]
  resources :art, only: [:index]
  resources :items, only: [:index,:show,:new,:create]
  resources :carts, only: [:show] do
    resources :orders, only: [:new,:create,:show]
  end

  post '/add_item' => 'carts#add_item'
  post '/update_item' => 'carts#update_item'
  delete '/delete_item' => 'carts#delete_item'

  get '/order_confirmation' => 'orders#order_confirmation'
  post '/order_pay' => 'orders#order_pay'



end
