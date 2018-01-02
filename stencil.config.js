exports.config = {
  namespace: 'wordpress-api',
  generateDistribution: true,
  bundles: [
    { components: ['wordpress-api'] }
  ],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
