json.id post.id
json.created post.dates[:create]
json.updated post.dates[:update]
json.created_at post.created_at
json.updated_at post.updated_at
json.post_text post.post_text
json.archetype do
  json.id post.archetype.id
  json.name post.archetype.name
end
json.deck do
  json.id post.deck.id
  json.name post.deck.name
  json.user do
    json.id post.deck.user.id
    json.username post.deck.user.username
    json.email post.deck.user.email
  end
  json.archetype do
    json.id post.deck.archetype.id
    json.name post.deck.archetype.name
    json.format do
      json.id post.deck.archetype.format.id
      json.name post.deck.archetype.format.name
    end
  end
end
json.result do
  json.id post.result.id
  json.wins post.result.wins
  json.losses post.result.losses
  json.text_result post.result.text_result
end