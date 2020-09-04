Rails.application.routes.draw do
  root to: "home#index"
  resources :profiles, only: [:index]
 
end
