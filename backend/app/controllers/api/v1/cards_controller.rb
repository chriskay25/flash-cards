class Api::V1::CardsController < ApplicationController

  def index
    cards = Card.all
    render json: cards
  end 

  def create
    card = Card.new(card_params)
    if card.save
      render json: card, status: :accepted
    else
      render json: {errors: card.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  private

  def card_params
    params.require(:card).permit(:question, :answer, :collection_id)
  end 

end