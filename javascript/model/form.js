var inherits = require('../inheritance');
var Subject = require('../subject');

var Form = function(validate) {
    inherits(new Subject(), this);
    this.AddObserver(validate);
};

Form.prototype.start = function() {
    this.Notify(this.data);
};

module.exports = Form;
