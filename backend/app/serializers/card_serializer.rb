class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :question, :answer, :collection_id, :collection
end
