var config = {};

function generateConfig(options) {
  var setup = {
    mode: options.mode,
    entry: options.entry || __dirname + '/index.js',
    output: {
      path: __dirname + options.outputPath,
      filename: options.name + (options.extension || '.js'),
    },
    plugins: [],
    node: {
      process: false,
    },
  };

  if (options.target) {
    setup.output.libraryTarget = options.target;
    setup.output.library = 'treebox';
  }

  if (options.sourceMapping) {
    setup.output.sourceMapFilename = options.name + '.map';
    setup.devtool = 'eval-source-map';
  }

  return setup;
}

config = generateConfig({
  name: 'index',
  mode: 'production',
  outputPath: '/dist/',
  target: 'commonjs2',
  extension: '.js',
});

module.exports = config;
