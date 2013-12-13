require 'uri'

module SassExtensions::Functions

  # Return an absolute URL to the named file
  def asset_url(filename)
    assert_type filename, :String
    # Store passed filename into and URI instance:
    uri = URI.parse(filename.value)
    # Process the path part of the URI instance:
    uri.path = SassExtensions::AssetManager.absolute_url_to(uri.path)
    Sass::Script::String.new("url('#{ url.to_s }')")
  end

  Sass::Script::Functions.declare :asset_url, args: [:filename]

end
