require 'dimensions'

module SassExtensions::Functions

  # Return the height of the named image
  def image_height(filename)
    assert_type filename, :String
    path_to_image = SassExtensions::AssetManager.path_to(filename.value)
    Sass::Script::Number.new(Dimensions.height(path_to_image), ['px'])
  end

  Sass::Script::Functions.declare :image_height, args: [:filename]

end
