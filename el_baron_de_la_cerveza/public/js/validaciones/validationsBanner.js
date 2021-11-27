function qs(element) {
    return document.querySelector(element);
}
  window.addEventListener("load", function () {
    
    let $formFile = qs("#formFile"),
      $fileErrors = qs("#fileErrors"),
      $form = qs("#form"),
      regExAlpha = /^[a-zA-Z\sñáéíóúü\0-9 ].{2,90}$/;
  
    $formFile.addEventListener("blur", function () {
      switch (true) {
        case !$formFile.value.trim():
          $fileErrors.innerHTML = "Debes ingresar un nombre de administrador";
          $formFile.classList.add("is-invalid");
          break;
        case !regExAlpha.test($formFile.value):
          $fileErrors.innerHTML = "Debes ingresar un nombre de mas de 5 carácteres";
          $formFile.classList.add("is-invalid");
          break;
        case regExAlpha.test($formFile.value):
            $fileErrors.innerHTML = "";
            $formFile.classList.remove("is-invalid");
            $formFile.classList.add("is-valid");
            break;
        default:
          $formFile.classList.remove("is-invalid");
          $formFile.classList.add("is-valid");
          $fileErrors.innerHTML = "";
          break;
      }
    });
  
  $form.addEventListener('submit',function(event){
      let error = false;
      event.preventDefault()
      console.log($form.elements)
      let elementosForm = this.elements
      
      for (let index = 0; index < elementosForm.length -1; index++) {
          if(elementosForm[index].value == "" || elementosForm[index].classList.contains("is-invalid")){
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
  