class Collection < ApplicationRecord
  has_many  :cards, dependent: :destroy
end
