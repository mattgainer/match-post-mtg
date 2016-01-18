class Api::V1::PostCommentsController < ApplicationController
  def index
    @post_comments = PostComment.where(post_id: params[:post_id], removed: false)
  end

  def show
    @post_comment = PostComment.find(params[:id])
  end

  def create
    @post_comment = PostComment.new(comment_text: params[:comment_text], post_id: params[:post_id], user_id: params[:user_id])
    if @post_comment.save
      render :show
    else

    end
  end

  def update
    @post_comment = PostComment.find(params[:id])
    @post_comment.attributes = {comment_text: params[:comment_text]}
    if @post_comment.save
      render :show
    else

    end
  end

  def destroy
    @post_comment = PostComment.find(params[:id])
    @post_comment.attributes = {removed: true}
    @post_comments = PostComment.where(post_id: @post_comment.post_id, removed: false)
    if @post_comment.save
      render :index
    else

    end
  end

end
