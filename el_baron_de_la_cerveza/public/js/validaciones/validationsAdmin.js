function qs(element) {
    return document.querySelector(element);
}
  window.addEventListener("load", function () {
    
    let $inputName = qs("#inputName"),
      $nameErrors = qs("#nameErrors"),
      $form = qs("#form"),
      $inputEmail = qs("#inputEmail"),
      $emailErrors = qs("#emailErrors"),
      $inputPass = qs("#inputPass"),
      $passError = qs("#passError"),
      $pass1 = qs("#pass1"),
      $passErrors = qs("#passErrors"),
      $pass2 = qs("#pass2"),
      $pass2Errors = qs("#pass2Errors"),
      regExAlpha = /^[a-zA-Z\sñáéíóúü\0-9 ].{2,90}$/,
      regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})$/;
  
    $inputName.addEventListener("blur", function () {
      switch (true) {
        case !$inputName.value.trim():
          $nameErrors.innerHTML = "Debes ingresar un nombre de administrador";
          $inputName.classList.add("is-invalid");
          break;
        case !regExAlpha.test($inputName.value):
          $nameErrors.innerHTML = "Debes ingresar un nombre de mas de 5 carácteres";
          $inputName.classList.add("is-invalid");
          break;
        default:
          $inputName.classList.remove("is-invalid");
          $inputName.classList.add("is-valid");
          $nameErrors.innerHTML = "";
          break;
      }
    });

    $inputEmail.addEventListener("blur", function () {
      switch (true) {
        case !inputEmail.value.trim():
          $emailErrors.innerHTML = "Debes ingresar un email";
          inputEmail.classList.add("is-invalid");
          break;
        case !regExAlpha.test(inputEmail.value):
          $emailErrors.innerHTML = "Debes ingresar un email valido";
          inputEmail.classList.add("is-invalid");
          break;
        default:
          inputEmail.classList.remove("is-invalid");
          inputEmail.classList.add("is-valid");
          $emailErrors.innerHTML = "";
          break;
      }
    });
    $inputPass.addEventListener('blur', function() {
      switch (true) {
          case !$inputPass.value.trim():
              $passError.innerHTML = "Ingrese su contraseña actual";
              $inputPass.classList.add("is-invalid");
              break;
          case !regExAlpha.test($inputPass.value):
              $passError.innerHTML = "Debe ingresar su contraseña actual";
              $inputPass.classList.add("is-invalid");
              break 
          default:
              $passError.innerHTML = "";
              $inputPass.classList.remove("is-invalid");
              $inputPass.classList.add("is-valid");
              break;
      }
    });

    $pass1.addEventListener('blur', function() {
      switch (true) {
          case !$pass1.value.trim():
              $passErrors.innerHTML = "Ingrese una nueva contraseña";
              $pass1.classList.add("is-invalid");
              break;
          case !regExPass.test($pass1.value):
              $passErrors.innerHTML = "La contraseña debe tener como minimo 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial";
              $pass1.classList.add("is-invalid");
              break 
          default:
              $passErrors.innerHTML = "";
              $pass1.classList.remove("is-invalid");
              $pass1.classList.add("is-valid");
              break;
      }
    });
    
    $pass2.addEventListener('blur', function(){
        switch (true) {
            case !$pass2.value.trim():
                $pass2Errors.innerHTML = "Debes reingresar la contraseña";
                $pass2.classList.add("is-invalid");
                break;
            case $pass2.value != $pass1.value:
                $pass2Errors.innerHTML = "Las contraseñas no coinciden";
                $pass2.classList.add("is-invalid");
                break;
            default:
                $pass2Errors.innerHTML = "";
                $pass2.classList.remove("is-invalid");
                $pass2.classList.add("is-valid");
                break;
        }
    })
  
  $form.addEventListener('submit',function(event){
      let error = false;
      event.preventDefault()
      console.log($form.elements)
      let elementosForm = this.elements
      
      for (let index = 0; index < elementosForm.length -1; index++) {
          if(elementosForm[index].value == ""){
            elementosForm[index].classList.add('is-invalid');

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
  