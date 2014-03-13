require 'cgi'

module SassExtensions::Functions

  # Return a string containing the escaped version of the provided data for
  # use as an URL identifier
  def escape_url(data)
    string = data.value.to_s
    escaped_string = CGI.escape(string)
    Sass::Script::String.new(escaped_string, :indentifier)
  end

  Sass::Script::Functions.declare :escape_url, args: [:data]

end
