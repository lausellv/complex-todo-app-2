const User = require('../models/User');

exports.login = function () {};

exports.logout = function () {};

exports.register = function (req, res) {
  console.log(req.body)
   let user = new User(req.body);
   user.register();
   // if length is 0 condition won't be met
   if (user.errors.length) {
     res.send(user.errors);  ///sending errors to user
   } else {
     res.send('<h1 style="color:green">Congrats, there are no errors</h1>');
   }
};

exports.home = function (req, res) {
  res.render('home-guest');
};
