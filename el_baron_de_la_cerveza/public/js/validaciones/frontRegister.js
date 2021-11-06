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
    $form = qs("#form"),
    submitErrors = qs("#submitErrors"),

    regExAlpha = /^[a-zA-Z\sñáéíóúü\0-9 ].{20,190}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
            case !regExPass.test($pass.value):
                $passErrors.innerHTML = "La contraseña debe tener como minimo 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial";
                break 
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
    $form.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        console.log($form.elements)
        let elementosForm = this.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if($inputName.value == "" && $inputEmail.value == "" 
               && $pass.value == "" && $pass2.value == ""){
                  $inputName.classList.add('is-invalid');
                  $inputEmail.classList.add('is-invalid');
                  $pass.classList.add('is-invalid');
                  $pass2.classList.add('is-invalid');
                  
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
                
            }
        }
  
        if(!error){
            console.log('Todo bien');
            $form.submit()
        }
    
    })
})