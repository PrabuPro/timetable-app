const middleware = {}

middleware['api/logger'] = require('..\\middleware\\api\\logger.js')
middleware['api/logger'] = middleware['api/logger'].default || middleware['api/logger']

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['notAuthenticated'] = require('..\\middleware\\notAuthenticated.js')
middleware['notAuthenticated'] = middleware['notAuthenticated'].default || middleware['notAuthenticated']

export default middleware
