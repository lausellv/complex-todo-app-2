const { request } = require('../app');
const User = require('../models/User');


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
