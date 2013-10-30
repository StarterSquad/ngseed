require 'dimensions'

module SassExtensions::Functions

  # Return the width of the named image
  def image_width(filename)
    assert_type filename, :String
    path_to_image = SassExtensions::AssetManager.path_to(filename.value)
    Sass::Script::Number.new(Dimensions.width(path_to_image), ['px'])
  end

  Sass::Script::Functions.declare :image_width, args: [:filename]

end
