class Card

  include ActiveModel::Model
  include ActiveModel::Naming
  include ActiveModel::Conversion

  attr_accessor :name, :id, :image_url

  def initialize (attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def self.unirest_new(hash = {})
    final = {}
    final[:name] = hash["name"]
    hash["editions"].each do |edition|
      if edition["multiverse_id"] != 0
        final[:id] = edition["multiverse_id"]
        final[:image_url] = edition["image_url"]
      end
    end
    Card.new(final)
  end

  def self.find_by_name(part_name)
    hash = Unirest.get("https://api.deckbrew.com/mtg/cards/typeahead?q=#{part_name}").body.first
    Card.unirest_new(hash)
  end
  def self.find(multi_id)
    hash = Unirest.get("https://api.deckbrew.com/mtg/cards?m=#{multi_id}").body.first
    Card.unirest_new(hash)
  end
  def persisted?
    false
  end
end