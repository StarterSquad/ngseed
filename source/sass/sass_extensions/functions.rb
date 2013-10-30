require 'sass'

Dir[File.dirname(__FILE__) + '/functions/*.rb'].each do |file|
  require file
end

module Sass::Script::Functions
  include SassExtensions::Functions
end
