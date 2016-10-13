var Form = require('./form');
var Validate = require('./validate');

window.onload = function() {
    var validate = new Validate();
    var form = new Form(validate);

    var startForm = function(event) {
        form.start();
    }

    window.addEventListener("keyup", startForm);
    document.addEventListener("click", startForm);
    //document.getElementById("submit").addEventListener("click", startForm);
    //document.getElementById("ingresos_mensuales").addEventListener("keyup", startForm);
};
