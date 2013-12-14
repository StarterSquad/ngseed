require 'pathname'

module SassExtensions::AssetManager

  # Return a Pathname instance containing a relative path to the named asset
  def self.relative_pathname_to(asset_filename)
    base_pathname = Pathname.new(SassExtensions::Config.base_path)
    raise_exception = lambda do
      raise Errno::ENOENT, asset_filename
    end
    SassExtensions::Config.asset_paths.find(raise_exception) do |asset_path|
      asset_pathname = base_pathname + asset_path + asset_filename
      if asset_pathname.exist?
        break asset_pathname.relative_path_from(base_pathname)
      end
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
