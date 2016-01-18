class Api::V1::DeckCommentsController < ApplicationController
  def index
    @deck_comments = DeckComment.where(deck_id: params[:deck_id], removed: false)
  end

  def show
    @deck_comment = DeckComment.find(params[:id])
  end

  def create
    @deck_comment = DeckComment.new(comment_text: params[:comment_text], deck_id: params[:deck_id], user_id: params[:user_id])
    if @deck_comment.save
      render :show
    else

    end
  end

  def update
    @deck_comment = DeckComment.find(params[:id])
    @deck_comment.attributes = {comment_text: params[:comment_text]}
    if @deck_comment.save
      render :show
    else

    end
  end

  def destroy
    @deck_comment = DeckComment.find(params[:id])
    @deck_comment.attributes = {removed: true}
    @deck_comments = DeckComment.where(deck_id: @deck_comment.deck_id, removed: false)
    if @deck_comment.save
      render :index
    else

    end
  end
end
