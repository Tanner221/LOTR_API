const routes = require('express').Router();

/******************************************
 * Route Locations
 *****************************************/
routes.use('/locations', require('./locations'))
routes.use('/characters', require('./characters'))

/******************************************
 * Test Route - Remove in production
 *****************************************/
routes.get('/profile', (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

module.exports = routes;