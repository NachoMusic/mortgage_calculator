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
function validate_age(num) {
    var valid = false;
    if (num.length > 0) {
        var regexp = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
        valid = regexp.test(num);
    }
    return valid;
}
function validate_nif(nif) {
    var valid = false;
    if (nif.length > 0) {
        var regexp = /^([0-9]{8})[A-Za-z]{1}$/;
        valid = regexp.test(nif);
    }
    return valid;
}
function validate_phone(phone) {
    var valid = false;
    if (phone.length > 0) {
        var regexp = /^((\+?34([ \t|\-])?)?[9|6|7]((\d{1}([ \t|\-])?[0-9]{3})|(\d{2}([ \t|\-])?[0-9]{2}))([ \t|\-])?[0-9]{2}([ \t|\-])?[0-9]{2})$/;
        valid = regexp.test(phone);
    }
    return valid;
}
function validate_email(email) {
    var valid = false;
    if (email.length > 0) {
        var regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        valid = regexp.test(email);
    }
    return valid;
}
function validate_text(text) {
    var valid = false;
    if (text.length > 0) {
        var regexp = /^[A-Za-z ]{2,20}$/;
        valid = regexp.test(text);
    }
    return valid;
}

function Validate() {
    inherits(new Observer(), this);
    this.Update = function(id_form) {
        var submitbutton = document.getElementById('submit');
        submitbutton.disabled = true;
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
        if (!validate_num(capital)) {
            valid = false;
            document.getElementById('e_capital').innerHTML = "Should be a number";
        } else {
            document.getElementById('e_capital').innerHTML = "";
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
            if (!validate_num(euribor+"")) {
                valid = false;
                document.getElementById('e_euribor').innerHTML = "Should be a number";
            } else {
                document.getElementById('e_euribor').innerHTML = "";
            }
            if (!validate_num(differential+"")) {
                valid = false;
                document.getElementById('e_differential').innerHTML = "Should be a number";
            } else {
                document.getElementById('e_differential').innerHTML = "";
            }
            document.getElementById('e_fixed_interest').innerHTML = "";
        } else {
            euribor_type.readOnly = true;
            differential_type.readOnly = true;
            fixed_interest_type.readOnly = false;
            interestApplied.value = fixed_interest - discount;
            document.getElementById('e_euribor').innerHTML = "";
            document.getElementById('e_differential').innerHTML = "";
            if (!validate_num(fixed_interest)) {
                valid = false;
                document.getElementById('e_fixed_interest').innerHTML = "Should be a number";
            } else {
                document.getElementById('e_fixed_interest').innerHTML = "";
            }
        }
        console.log(valid);
        if (valid) {
            var total = parseFloat((capital * interestApplied.value) / 12) /
                (100 * (1 -
                    Math.pow(1 + ((interestApplied.value / 12) / 100), (-1) *
                        period * 12)));
            monthly_quote.value = total;

            var interestTotal = (total* (period * 12) )-capital;
            document.getElementById('interestTotal').innerHTML = "At the end you pay " + interestTotal + " interest";
        }

        //////////////////////// Personal data /////////////////////////
        var nif = document.getElementById('nif').value;
        var nombre = document.getElementById('nombre').value;
        var surname1 = document.getElementById('surname1').value;
        var surname2 = document.getElementById('surname2').value;
        var age = document.getElementById('age').value;
        var mobile = document.getElementById('mobile').value;
        var email = document.getElementById('email').value;

        if (!validate_nif(nif)) {
            valid = false;
            document.getElementById('e_nif').innerHTML = "Write a correct nif";
        } else {
            document.getElementById('e_nif').innerHTML = "";
        }
        if (!validate_text(nombre)) {
            valid = false;
            document.getElementById('e_nombre').innerHTML = "Write a text name > 1 char";
        } else {
            document.getElementById('e_nombre').innerHTML = "";
        }
        if (!validate_text(surname1)) {
            valid = false;
            document.getElementById('e_surname1').innerHTML = "Write a text surname > 1 char";
        } else {
            document.getElementById('e_surname1').innerHTML = "";
        }
        if (!validate_text(surname2)) {
            valid = false;
            document.getElementById('e_surname2').innerHTML = "Write a text surname > 1 char";
        } else {
            document.getElementById('e_surname2').innerHTML = "";
        }
        if (!validate_age(age)) {
            valid = false;
            document.getElementById('e_age').innerHTML = "Write a correct age";
        } else {
            document.getElementById('e_age').innerHTML = "";
        }
        if (!validate_phone(mobile)) {
            valid = false;
            document.getElementById('e_mobile').innerHTML = "Write a correct mobile number";
        } else {
            document.getElementById('e_mobile').innerHTML = "";
        }
        if (!validate_email(email)) {
            valid = false;
            document.getElementById('e_email').innerHTML = "Write a correct email";
        } else {
            document.getElementById('e_email').innerHTML = "";
        }

        if(valid){
            submitbutton.disabled=false;
        }
    };
}

module.exports = Validate;
