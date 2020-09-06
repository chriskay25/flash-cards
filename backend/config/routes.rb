Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :cards, only: [:index, :create]
      resources :collections, only: [:index, :create, :show]
    end
  end 

end
