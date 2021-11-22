function qs(element) {
    return document.querySelector(element);
}
  window.addEventListener("load", function () {
    
    let $form = qs("#form"),
      $inputPass = qs("#inputPass"),
      $passError = qs("#passError"),
      $pass1 = qs("#pass1"),
      $passErrors = qs("#passErrors"),
      $pass2 = qs("#pass2"),
      $pass2Errors = qs("#pass2Errors"),
      regExAlpha = /^[a-zA-Z\sñáéíóúü\0-9 ].{2,90}$/,
      
      regExPass = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    $inputPass.addEventListener('blur', function() {
      switch (true) {
          case !$inputPass.value.trim():
              $passError.innerHTML = "Ingrese su contraseña actual";
              break;
          case !regExAlpha.test($inputPass.value):
              $passError.innerHTML = "Debe ingresar su contraseña actual";
              break 
          default:
              $passError.innerHTML = "";
              break;
      }
    });

    $pass1.addEventListener('blur', function() {
      switch (true) {
          case !$pass1.value.trim():
              $passErrors.innerHTML = "Ingrese una nueva contraseña";
              break;
          case !regExPass.test($pass1.value):
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
                $pass2Errors.innerHTML = "Debes reingresar la nueva contraseña";
                break;
            case $pass2.value != $pass1.value:
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
          if(elementosForm[index].value == ""){
            elementosForm[index].style.border = "2px solid red";

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
  