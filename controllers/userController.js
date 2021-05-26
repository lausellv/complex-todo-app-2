//const { request } = require('../app');
const User = require('../models/User');

//Part 1 user login using Promise
// exports.login = function (req, res, next) {
// let user = new User(req.body);
// user.login().then(function (result){
//   res.send(result)
// }).catch(function (e){
//   res.send(e)
// });
// };

//Part 1a added session validation
exports.login = function (req, res) {
  let user = new User(req.body);
  user.login().then(function (itworks) {
      req.session.user = {avatar: user.avatar, username: user.data.username};
      req.session.save(function () {
        res.redirect('/');
      });
    })
    .catch(function (err) {
      // typically one uses e
      req.flash('errors', err);
      // req.session.flash.errors = [doesntWorkError]
      req.session.save(function () {
        res.redirect('/');
      });
    });
};



exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect('/');
  });
};


exports.register = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.register();
    req.session.user = { username: user.username, avatar:user.avatar };
  } catch (regErrors) {
    regErrors.forEach(error => {
      req.flash('regErrors', error);
    });
  } finally {
    req.session.save(() => {
      res.redirect('/');
    });
  }
};


// exports.register = function (req, res) {
//   let user = new User(req.body);
//   user.register().then(() => {
//       req.session.user = { username: user.data.username };
//       req.session.save(function () {
//         res.redirect('/');
//       });
//     }).catch((regErrors) => {
//       regErrors.forEach(function (error) {
//         req.flash('regErrors', error);
//       }); ///sending errors to user
//       req.session.save(function () {
//         res.redirect('/');
//       });
//     });
// };

exports.home = function (req, res) {
  if (req.session.user) {
    res.render('home-dashboard', {username: req.session.user.username,  avatar: req.session.user.avatar});
    /*[0].toUpperCase()+req.session.user.username.toLowerCase().slice(1)*/
  } else {
    res.render('home-guest', { errors: req.flash('errors'), regErrors: req.flash('regErrors')});
  }
};
