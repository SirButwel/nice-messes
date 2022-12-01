module TranslateHelper
  def translate(word)
    case word
    when "bicycling"
      "Vélo"
    when "driving"
      "Voiture"
    when "walking"
      "Marche"
    end
  end
end
