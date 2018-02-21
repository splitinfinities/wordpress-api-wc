exports.config = {
  namespace: 'wordpress-api',
  generateDistribution: true
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
