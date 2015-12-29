class ArchetypesController < ApplicationController
  before_action :authenticate_admin!

  def index
    @archetypes = Archetype.all.order(:format_id, :name)
  end

  def new
    @archetype = Archetype.new
  end

  def create
    @archetype = Archetype.new(archetype_params)
    if @archetype.save
      redirect_to "/archetypes/"
      flash[:success] = "Archetype Created"
    else
      render :new
      flash[:warning] = "Archetype Not Created"
    end
  end

  def edit
    @archetype = Archetype.find(params[:id])
  end

  def update
    @archetype = Archetype.find_by(id: params[:id])
    if @archetype.update(archetype_params)
      flash[:info] = "Archetype Updated"
      redirect_to "/archetypes"
    else
      flash[:warning] = "Archetype Not Updated"
      render :edit
    end
  end

  def destroy
    Archetype.find_by(id: params[:id]).update(removed: true)
    redirect_to "/archetypes"
    flash[:warning] = "Archetype Deleted"
  end

  private

  def archetype_params
    params.require(:archetype).permit(:id, :name, :format_id, :removed)
  end
end
