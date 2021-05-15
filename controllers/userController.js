const { request } = require('../app');
const User = require('../models/User');

<<<<<<< HEAD

//user login using Promise
// exports.login = function (req, res, next) {
// let user = new User(req.body);
// user.login().then(function (result){
//   res.send(result)
// }).catch(function (e){
//   res.send(e)
// });
// };


exports.login = function (req, res) {
  let user = new User (req.body);
user.login().then(function(itworks){
  req.session.user = {username: user.data.username}
  res.send(itworks)
}).catch(function(doesntWorkError){
  res.send(doesntWorkError)
})
}

// user login usinng traditional callback
// exports.login = function (req, res) {
//   let user = new User (req.body);
// user.login(function (result){
//   res.send(result)
// })
// }

=======
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
>>>>>>> e7ce7d99d19e32ba931a89605cfe9200c4d83df4

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
  if (req.session.user){
res.send ('<h1 style="color:green">welcome to the actual app!!</h1>')
  }else {
    res.render('home-guest');
  }
};
