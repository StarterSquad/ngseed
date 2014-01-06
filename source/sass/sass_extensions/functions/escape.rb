require 'cssesc'

module SassExtensions::Functions

  # Return a string containing the escaped version of the provided data for
  # use as a CSS identifier
  def escape(data)
    string = data.value.to_s
    escaped_string = CSSEsc.escape(string, is_identifier: true)
    Sass::Script::String.new(escaped_string, :indentifier)
  end

  Sass::Script::Functions.declare :escape, args: [:data]

end
