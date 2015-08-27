var express = require('express')
  , router  = express.Router()
  , User    = require('../models/user')

router.get('/user', function(req, res) {
    // TODO: User index
    res.render('index');
});

router.post('/login', function(req, res) {
    // TODO: Redirect with error message if no password or username are included in request
    if(!req.body.username || !req.body.password) res.redirect('/');
    User.login(req.body.username, req.body.password)
        .then(function(resUser) {
            // TODO: Redirect with success message
            req.session.user = resUser;
            res.redirect('/');
        }).catch(User.NotFoundError, function() {
            // TODO: Redirect with error message
            res.redirect('/');
        }).catch(function(err) {
            console.error(err);
        });
});

module.exports = router
