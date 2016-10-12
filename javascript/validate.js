var inherits = require('./inheritance');
var Observer = require('./observer');

function validate_num(num) {
    var valid = false;
    if (num.length > 0) {
        var regexp = /^[0-9]*$/;
        valid = regexp.test(num);
    }
    return valid;
}

function Validate() {
    inherits(new Observer(), this);
    this.Update = function(id_form) {
        var ingresos_mensuales = document.getElementById('ingresos_mensuales').value;
        var capital = document.getElementById('capital').value;
        var valid = true;
        if (!validate_num(ingresos_mensuales))
            valid = false;
        if (!validate_num(capital))
            valid = false;
        console.log(valid);
    };
}

module.exports = Validate;
