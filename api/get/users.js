var g = require('dyson-generators');
var _ = require('lodash');
var faker = require('faker');

var user = {
  path: '/users/:id.json',
  template: {
    id: function(params, query, body) { return params.id; },
    email: function() { return faker.internet.email(); },
    avatar_url: function() { return faker.internet.avatar(); }
  }
};

var users = {
  path: '/users.json',
  collection: true,
  size: 10,
  template: _.extend(_.clone(user.template), {
    id: g.id
  })
};

module.exports = [user, users];