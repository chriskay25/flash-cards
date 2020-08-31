Rails.application.routes.draw do

  namespace :api do
    namespace :vi do
      resources :cards, only: [:index]
    end
  end 

end
