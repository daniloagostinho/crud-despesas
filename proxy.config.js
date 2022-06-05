const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: ['https://api-hands-on.herokuapp.com/'],
    secure: true,
    log: 'debug',
    pathRewrite: {'^/api': ''}
  }
]

module.exports = PROXY_CONFIG;
