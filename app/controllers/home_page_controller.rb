class HomePageController < ApplicationController
  def index
  end

  def products
     render json: [
        {name: 'a', price: 10},
        {name: 'b', price: 20},
        {name: 'c', price: 30}

      ] 
  end  
end
