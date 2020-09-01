class CollectionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :cards
end
