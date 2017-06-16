var express = require('express');
var router = express.Router();
var Space = require("../models/space").Space;
var User = require("../models/user").User;

function authenticate(name, fn) {
  var user = User.findOne({username: name});
  if (!user) return fn(new Error('cannot find user'));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/new', { title: 'VeBnB', user: 'Sakitalotte' });
});

router.get('/spaces/new', function(req,res) {
  res.render('spaces/new', { title: 'VeBnB', user: 'Sakitalotte' });
});

router.get('/spaces/all', function(req, res, next) {
	var spaces = [];
	Space.find({}, function(err,spaces) {
    spaces.forEach(function(space) {
      if (space !== undefined) {
        spaces.push(space);
      };
     })
	}).then(function(spaces) {
			res.render('spaces/all', { title: 'Listings Available', spaces: spaces, user: 'Sakitalotte'});
	}).catch(next);
});

router.post('/confirm', function(req, res) {
	// res.render('confirm', { title: 'Confirmation', user: 'Sakitalotte'});
  console.log(req.body)
  Space.update({ _id :req.body.id }, {$set: {booked: true}}).then(function() {
    res.redirect('/spaces/all');
  })

});

router.post('/spaces', function(req, res) {
  console.log(req.body)
  var temp = new Space({name: req.body.name,
												address: req.body.address,
												price: req.body.price,
												description: req.body.description});
  temp.save(function(err) {
    if (err) {
      console.log('Missing input', err);
    } else {
      res.redirect('spaces/all');
    };
  });
});

router.get('/users/new', function(req, res) {
  res.render('users/new', { title: 'Sign Up', user: ''});
});

// router.post('/signup', function(req, res) {
//   var userNew = req.body.username;
//   var temp = new User({username: userNew});
//   temp.save(function() {
//     if (userNew.length === 0) {
//       res.redirect('/signup');
//     } else {
//       res.redirect('spaces/all');
//     };
//   });
// });

router.post('/signup', function(req,res) {
  console.log(0);
  authenticate(req.body.username, function(err,user) {
    console.log(1);
    if(user){
      req.session.regenerate(function() {
        req.session.user = user;
        req.session.success = 'Authenticated as' + 'user.username';
        res.redirect('/spaces/all');
      });
    } else {
      req.session.error = 'Authentication failed';
      res.redirect('/users/new')
    };
  });
});

module.exports = router;
