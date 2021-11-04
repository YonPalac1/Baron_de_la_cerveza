function qs(element) {
    return document.querySelector(element)
}

window.addEventListener("load", function() {
    let $inputName = qs("#name"),
    $nameErrors = qs("#nameErrors"),
    $inputEmail = qs("#email"),
    $emailErrors = qs("#emailErrors"),
    $pass = qs("#pass"),
    $passErrors = qs("#passErrors"),
    $pass2 = qs("#pass2"),
    $pass2Errors = qs("#pass2Errors"),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    $inputName.addEventListener("blur", function () {
        switch (true) {
          case !$inputName.value.trim():
            $nameErrors.innerHTML = "Ingrese un Nombre";
            break;
          default:
            $nameErrors.innerHTML = "";
            break;
        }
    });
    
    $inputEmail.addEventListener("blur", function() {
        switch (true) {
            case !$inputEmail.value.trim():
                $emailErrors.innerHTML = "Ingrese un Email";
                break;
            case !regExEmail.test($inputEmail.value):
                $emailErrors.innerHTML = "El Email ingresado no es valido";
                break
            default:
                $emailErrors.innerHTML = ""
                break;
        }
    });
    
    $pass.addEventListener('blur', function() {
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = "Ingrese una Contraseña";
                break;
            /* case !regExPass.test($pass.value):
                $passErrors.innerHTML = "La contraseña debe tener como minimo 6 caracteres";
                break */
            default:
                $passErrors.innerHTML = "";
                break;
        }
    });
    
    $pass2.addEventListener('blur', function(){
        switch (true) {
            case !$pass2.value.trim():
                $pass2Errors.innerHTML = "Debes reingresar la contraseña";
                break;
            case $pass2.value != $pass.value:
                $pass2Errors.innerHTML = "Las contraseñas no coinciden";
                break;
            default:
                $pass2Errors.innerHTML = "";
                break;
        }
    })
})