# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |gem|
  gem.name          = 'twbt-bootstrap'
  gem.version       = '2.2.2.0'
  gem.authors       = ['Jason Taylor']
  gem.email         = ['jason@redant.com.au']
  gem.description   = %q{12wbt Bootstrap Sass Overides}
  gem.summary       = %q{The default styles for Michelle Bridges 12 Week Body Transformation using Bootstrap Sass and Bourbon}
  gem.homepage      = 'https://github.com/red-ant/12wbt-bootstrap'
  gem.files         = Dir['{lib,app}/**/*'] + ['LICENSE.txt', 'README.md']

  gem.add_dependency 'bootstrap-sass', '~> 2.2.2'
  gem.add_dependency 'bourbon',        '~> 3.0'
end
