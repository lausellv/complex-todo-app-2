const User = require('../models/User');

//using a promise
exports.login = function (req, res) {
let user = new User(req.body);
user.login().then(function (result){
  res.send(result)
}).catch(function (err){
  res.send(err)
})
 };

// traditional way using a callback function
// exports.login = function (req, res) {
//   let user = new User(req.body);
//   user.login(function (result){  // this is the callback from Users.prototype.login we are passing in as an argument
// res.send(result)  // this is what we send to the viewer // whatever comes out from the User.prototype.login callback depending on the if or else outcome
//   })
// }

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
