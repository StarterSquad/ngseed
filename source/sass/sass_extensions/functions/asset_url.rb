module SassExtensions::Functions

  # Return an absolute URL to the named file
  def asset_url(filename)
    assert_type filename, :String
    url_to_asset = SassExtensions::AssetManager.absolute_url_to(filename.value)
    Sass::Script::String.new("url('#{ url_to_asset }')")
  end

  Sass::Script::Functions.declare :asset_url, args: [:filename]

end
