require 'chunky_png'

module SassExtensions::Functions

  # Return a base64-encoded picture of a stoke described by the passed properties
  def inline_stroke(color, spacing = Sass::Script::Number.new(0))

    assert_type color, :Color
    assert_type spacing, :Number

    stroke_spacing = spacing.value.round
    stroke_width = [1, stroke_spacing].max
    stroke_color = ChunkyPNG::Color.rgba(*color.rgb, (255 * color.alpha).round)

    png = ChunkyPNG::Image.new(stroke_width + stroke_spacing, 1)
    stroke_width.times do |x|
      png[x, 0] = stroke_color
    end

    base64 = ['data:image/png;base64,', png.to_blob(:fast_rgba)].pack('A*m').gsub(/\n/, '')
    Sass::Script::String.new("url(#{ base64 })")
  end

  Sass::Script::Functions.declare :inline_stroke, [:color, :spacing]

end
