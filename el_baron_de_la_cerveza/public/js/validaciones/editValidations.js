function qs(element) {
    return document.querySelector(element);
}
  
  window.addEventListener("load", function () {
    let $inputName = qs("#inputName"),
      $nameErrors = qs("#nameErrors"),
      $form = qs("#form"),
      $price = qs("#inputPrice"),
      $priceErrors = qs("#priceErrors"),
      $brand = qs("#brandSelect"),
      $brandErrors = qs("#brandErrors"),
      $category = qs("#categorySelect"),
      $categoryErrors = qs("#categoryErrors"),
      $inputDescription = qs('#inputDescription'),
      $descriptionErrors = qs("#descriptionErrors"),
      submitErrors = qs("#submitErrors"),
      

      regExPrice = /^[0-9].{0,8}$/,
      regExAlpha = /^[a-zA-Z\sñáéíóúü\0-9 ].{5,90}$/,
      regExDescription = /^[a-zA-Z\sñáéíóúü\0-9 ].{20,190}$/;
  
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
  
    $price.addEventListener('blur', function() {
        switch (true) {
            case !$price.value.trim():
                $priceErrors.innerHTML = 'El campo price es obligatorio';
                $price.classList.add('is-invalid')
                break;
            case !regExPrice.test($price.value):
                $priceErrors.innerHTML = 'Debe ingresar un price válido';
                $price.classList.add('is-invalid')
                break
            default:
                $price.classList.remove('is-invalid');
                $price.classList.add('is-valid');
                $priceErrors.innerHTML = ''
                break;
        }
    })
  
    $brand.addEventListener('blur', function() {
      switch (true) {
          case !$brand.value.trim():
              $brandErrors.innerHTML = 'El campo marca es obligatorio';
              $brand.classList.add('is-invalid')
              break;
          case !regExPrice.test($brand.value):
              $brandErrors.innerHTML = 'Debe ingresar una marca válida';
              $brand.classList.add('is-invalid')
              break
          default:
              $brand.classList.remove('is-invalid');
              $brand.classList.add('is-valid');
              $brandErrors.innerHTML = ''
              break;
      }
  })
  
  $category.addEventListener('blur', function() {
      switch (true) {
          case !$category.value.trim():
              $categoryErrors.innerHTML = 'El campo categoria es obligatorio';
              $category.classList.add('is-invalid')
              break;
          case !regExPrice.test($category.value):
              $categoryErrors.innerHTML = 'Debe ingresar una categoria válida';
              $category.classList.add('is-invalid')
              break
          default:
              $category.classList.remove('is-invalid');
              $category.classList.add('is-valid');
              $categoryErrors.innerHTML = ''
              break;
      }
  })
  $inputDescription.addEventListener('blur', function() {
    switch (true) {
        case !$inputDescription.value.trim():
            $descriptionErrors.innerHTML = 'El campo descripcion es obligatorio';
            $inputDescription.classList.add('is-invalid')
            break;
        case !regExDescription.test($inputDescription.value):
            $descriptionErrors.innerHTML = 'Debe ingresar una descripcion de al menos 20 caracteres';
            $inputDescription.classList.add('is-invalid')
            break
        default:
            $inputDescription.classList.remove('is-invalid');
            $inputDescription.classList.add('is-valid');
            $descriptionErrors.innerHTML = ''
            break;
        }
    })
  
  $form.addEventListener('submit',function(event){
      let error = false;
      event.preventDefault()
      console.log($form.elements)
      let elementosForm = this.elements
      
      for (let index = 0; index < elementosForm.length-1; index++) {
          if($inputName.value == "" || $price.value == "" 
          || $brand.value == "" || $category.value == ""){
            
              $inputName.classList.add('is-invalid');
              $price.classList.add('is-invalid');
              $brand.classList.add('is-invalid');
              $category.classList.add('is-invalid');

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
  