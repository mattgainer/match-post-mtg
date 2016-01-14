json.id deck.id
json.name deck.name
json.created deck.dates[:create]
json.updated deck.dates[:update]
json.created_at deck.created_at
json.updated_at deck.updated_at
json.user do
  json.id deck.user.id
  json.username deck.user.username
  json.email deck.user.email
end
json.archetype do
  json.id deck.archetype.id
  json.name deck.archetype.name
  json.format do
    json.id deck.archetype.format.id
    json.name deck.archetype.format.name
  end
end