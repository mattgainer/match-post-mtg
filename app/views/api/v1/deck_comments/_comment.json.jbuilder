json.id comment.id
json.comment_text comment.comment_text
json.created_at comment.created_at
json.updated_at comment.updated_at
json.dates comment.dates
json.user do
  json.id comment.user_id
  json.username comment.user.username
end
json.deck do
  json.id comment.deck_id
end