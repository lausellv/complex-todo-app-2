const User = require('../models/User');

exports.login = function (req, res, next) {
let user = new User(req.body);
user.login(function (result) {
  res.send(result);
  
});


};

exports.logout = function () {};

exports.register = function (req, res) {
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
