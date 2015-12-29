class FormatsController < ApplicationController
  before_action :authenticate_admin!
  def index
    @formats = Format.all
  end

  def new
    @format = Format.new
  end

  def create
    @format = Format.new(format_params)
    if @format.save
      redirect_to "/formats/"
      flash[:success] = "Format Created"
    else
      render :new
      flash[:warning] = "Format Not Created"
    end
  end

  def edit
    @format = Format.find(params[:id])
  end

  def update
    @format = Format.find_by(id: params[:id])
    if @format.update(format_params)
      flash[:info] = "Format Updated"
      redirect_to "/formats"
    else
      flash[:warning] = "Format Not Updated"
      render :edit
    end
  end

  def destroy
    Format.find_by(id: params[:id]).destroy
    redirect_to "/formats"
    flash[:warning] = "Format Deleted"
  end

  private

  def format_params
    params.require(:format).permit(:id, :name)
  end
end
