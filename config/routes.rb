Rails.application.routes.draw do
  root 'home_page#index'
  get '/api/products', to: 'home_page#products' 
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end


