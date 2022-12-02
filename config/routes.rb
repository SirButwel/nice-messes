Rails.application.routes.draw do
  get 'users/index'
  get '/account', to: 'pages#dashboard'
  devise_for :users
  root to: "images#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :itineraries, only: %i[create index show destroy] do
    resources :images, only: %i[create]
  end
  resources :images, only: %i[index show]
end
