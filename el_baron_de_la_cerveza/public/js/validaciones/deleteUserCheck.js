function qs(element) {
    return document.querySelector(element);
}
  window.addEventListener("load", function () {
    
    let $form = qs("#form"),
      $pass = qs("#pass"),
      $passErrors = qs("#passError");

    $pass.addEventListener('blur', function() {
      switch (true) {
          case !$pass.value.trim():
              $passErrors.innerHTML = "Ingrese su contraseña";
              $pass.style.border = "2px solid red";
              break;
          default:
              $passErrors.innerHTML = "";
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
  