require 'pathname'

module SassExtensions::AssetManager

  # Return a Pathname instance containing a relative path to the named asset
  def self.relative_pathname_to(asset_filename)
    raise_exception = lambda do
      raise Errno::ENOENT, asset_filename
    end
    SassExtensions::Config.asset_paths.find(raise_exception) do |load_path|
      asset_pathname = Pathname.new(load_path) + asset_filename
      break asset_pathname if asset_pathname.exist?
    end
  end

  # Return a relative path to the named asset
  def self.path_to(asset_filename)
    relative_pathname_to(asset_filename).expand_path.to_s
  end

  # Return an absolute URL to the named asset
  def self.absolute_url_to(asset_filename)
    '/' + relative_pathname_to(asset_filename).to_s
  end

end
