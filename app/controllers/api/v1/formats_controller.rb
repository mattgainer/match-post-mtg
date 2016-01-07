class Api::V1::FormatsController < ApplicationController
  def index
    @formats = Format.all
  end
  def show
    @format = Format.find(params[:id])
  end
  def create
  end
  def update
  end
  def destroy
  end
end
