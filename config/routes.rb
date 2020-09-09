Rails.application.routes.draw do
  root to: "home#index"
  resources :profiles, only: [:index]
  resources :barber, only: [:index]
  resources :art, only: [:index]
  resources :items, only: [:index,:show,:new,:create]
  resources :carts, only: [:show] do
    resources :orders, only: [:new,:create]
    

  end

  post '/add_item' => 'carts#add_item'
  post '/update_item' => 'carts#update_item'
  delete '/delete_item' => 'carts#delete_item'

  get '/order_confirmation' => 'orders#order_confirmation'
  get '/order_pay' => 'orders#order_pay'



end
