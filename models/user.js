var bookshelf = require('../db');

var User = bookshelf.Model.extend({
    initialize: function() {
        this.on('saving', this.validateSave);
    },
    validateSave: function() {
        // TODO: Implement real checking
        return false;
    },
}, {
    // TODO: Add class methods
});
