function qs(element) {
    return document.querySelector(element);
}
  window.addEventListener("load", function () {
    
    let $inputName = qs("#inputName"),
    $nameErrors = qs("#nameErrors")
      $form = qs("#form"),
      $inputEmail = qs("#inputEmail"),
      $emailErrors = qs("#emailErrors"),
      $inputPass = qs("#inputPass"),
      $passError = qs("#passError"),
      $pass1 = qs("#pass1"),
      $passErrors = qs("#passErrors"),
      $pass2 = qs("#pass2"),
      $pass2Errors = qs("#pass2Errors")
      regExAlpha = /^[a-zA-Z\sñáéíóúü\0-9 ].{2,90}$/;
      
      regExPass = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    $inputName.addEventListener("blur", function () {
      switch (true) {
        case !$inputName.value.trim():
          $nameErrors.innerHTML = "Debes ingresarle un nombre al producto";
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

  
  $form.addEventListener('submit',function(event){
      let error = false;
      event.preventDefault()
      console.log($form.elements)
      let elementosForm = this.elements
      
      for (let index = 0; index < elementosForm.length-1; index++) {
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
  