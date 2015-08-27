var bookshelf = require('../db');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var passwordHashLen = 12;

var User = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'id',
    initialize: function() {
        this.on('saving', this.validateSave);
    },
    validateSave: function() {
        // TODO: Implement real checking
        return false;
    },
}, {
    login: Promise.method(function(email, password) {
        if (!email || !password) throw new Error('Email and password are both required');
        return new this({email: email.toLowerCase().trim()}).fetch({require: true}).tap(function(user) {
            return bcrypt.compareAsync(user.get('password'), password);
        });
    }),
    register: Promise.method(function(name, email, password, password_confirm)
    {
        if (!email || !password || !password_confirm) throw new Error('Email, password and password confirmation are all required');
        if (password != password_confirm) throw new Error('Passwords do not match.');
        if (new this({email: email.toLowerCase().trim()}).count() != 0) throw new Error('Email already exists.');
        bcrypt.genSalt(passwordHashLen, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                User.forge({
                    name: name,
                    email: email,
                    password: hash
                }).save();
            });
        });
    }),
    setPassword: Promise.method(function(newPassword)
    {
        bcrypt.genSalt(passwordHashLen, function(err, salt) {
            bcrypt.hash(newPassword, salt, function(err, hash) {
                this.set('password', hash).save();
            });
        });
    }),
});
