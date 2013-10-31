require 'mime/types'

module SassExtensions::Functions

  # Embed the contents of the named asset directly inside a stylesheet.
  def inline_asset(filename)
    assert_type filename, :String
    path_to_asset = SassExtensions::AssetManager.path_to(filename.value)

    mime_type = MIME::Types.type_for(path_to_asset).first.content_type
    content = File.read(path_to_asset)
    base64 = [content].flatten.pack('m').gsub("\n", '')

    Sass::Script::String.new("url('data:#{ mime_type };base64,#{ base64 }')")
  end

  Sass::Script::Functions.declare :inline_asset, args: [:filename]

end
