Rails.application.routes.draw do
  root to: "home#index"
  resources :profiles, only: [:index]
  resources :barber, only: [:index]
  resources :art, only: [:index]
 
end
