class Api::V1::ArchetypesController < ApplicationController
  def index
    @archetypes = Archetype.where(format_id: params[:format_id], removed: false)
  end
  def show
    @archetype = Archetype.find(params[:id])
  end
  def create
  end
  def update
  end
  def destroy
  end

end
