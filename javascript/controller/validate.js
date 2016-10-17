var inherits = require('../inheritance');
var Observer = require('../observer');

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
        // vars for values
        var ingresos_mensuales = document.getElementById('ingresos_mensuales').value;
        var capital = document.getElementById('capital').value;
        var interest_rate_type = document.getElementById('interest_rate_type').value;
        var euribor = parseFloat(document.getElementById('euribor').value);
        var differential = parseFloat(document.getElementById('differential').value);
        var fixed_interest = document.getElementById('fixed_interest').value;
        var period = document.getElementById('period').value;
        var monthly_quote = document.getElementById('monthlyQuote');
        var interestApplied = document.getElementById('interestApplied');
        // vars for changing the state
        var differential_type = document.getElementById('differential');
        var euribor_type = document.getElementById('euribor');
        var fixed_interest_type = document.getElementById('fixed_interest');
        var valid = true;

        if (!validate_num(ingresos_mensuales)) {
            valid = false;
            document.getElementById('e_ingresos_mensuales').innerHTML = "Should be a number";
        } else {
            document.getElementById('e_ingresos_mensuales').innerHTML = "";
        }
        if (!validate_num(capital)){
            valid = false;
            document.getElementById('e_capital').innerHTML = "Should be a number";
        } else {
            document.getElementById('e_capital').innerHTML = "";
        }
        if (!validate_num(euribor)){
            valid = false;
            document.getElementById('e_euribor').innerHTML = "Should be a number";
        } else {
            document.getElementById('e_euribor').innerHTML = "";
        }
        if (!validate_num(differential)){
            valid = false;
            document.getElementById('e_differential').innerHTML = "Should be a number";
        } else {
            document.getElementById('e_differential').innerHTML = "";
        }
        if (!validate_num(period)){
            valid = false;
            document.getElementById('e_period').innerHTML = "Should be a number";
        } else {
            document.getElementById('e_period').innerHTML = "";
        }

        function associated_products() {
            var homeInsurance = document.getElementById("homeInsurance").checked;
            var paysheet = document.getElementById("paysheet").checked;
            var lifeInsurance = document.getElementById("lifeInsurance").checked;
            var discount = 0;
            if (homeInsurance)
                discount += 0.25;
            if (paysheet)
                discount += 0.10;
            if (lifeInsurance)
                discount += 0.5;
            return discount;
        }
        var discount = associated_products();

        if (interest_rate_type === "variable") {
            fixed_interest_type.readOnly = true;
            euribor_type.readOnly = false;
            differential_type.readOnly = false;
            interestApplied.value = euribor + differential - discount;
        } else {
            euribor_type.readOnly = true;
            differential_type.readOnly = true;
            fixed_interest_type.readOnly = false;
            interestApplied.value = fixed_interest - discount;
        }
        console.log(valid);
        if (valid) {
            var total = parseFloat((capital * interestApplied.value) / 12) /
                (100 * (1 -
                    Math.pow(1 + ((interestApplied.value / 12) / 100), (-1) *
                        period * 12)));
            monthly_quote.value = total;

            var interestTotal = (total*12)-capital;
            document.getElementById('interestTotal').innerHTML = "At the end you pay " + interestTotal + " interest";
        }
        //////////////////////// Personal data /////////////////////////


    };
}

module.exports = Validate;
