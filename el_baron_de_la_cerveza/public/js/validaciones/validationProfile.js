window.addEventListener("load", () => {
    let $form = document.getElementById("form"),
        $inputName = document.getElementById("name"),
        $nameError = document.getElementById("nameErrors"),
        $inputPhone = document.getElementById("tel"),
        $phoneError = document.getElementById("phoneErrors"),
        $inputStreet = document.getElementById("adress"),
        $streetError = document.getElementById("streetErrors"),
        $inputCity = document.getElementById("city"),
        $cityError = document.getElementById("cityErrors"),
        $inputProvince = document.getElementById("province"),
        $provinceError = document.getElementById("provinceErrors"),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExPhone = /[0-9\ \.\-\s\,]/
        regExStreet = /[A-Za-z0-9'\.\-\s\,]/,
        regExCity = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    
    let errors = []

    $inputName.addEventListener("blur", () => {
      switch (true) {
        case !$inputName.value.trim():
          $nameError.innerHTML = "El campo nombre es obligatorio";
          errors.push(1)
          break;
        case !regExAlpha.test($inputName.value):
          $nameError.innerHTML = "Debes ingresar un nombre válido";
          errors.push(2)
          break;
        default:
          $nameError.innerHTML = ""
          break;
      }
    })
  
    $inputPhone.addEventListener("blur", () => {
      switch (true) {
          case !$inputPhone.value.trim():
              $phoneError.innerHTML = "Ingresá tu telefono para completar tu perfil"
              $phoneError.classList.remove("error")
              break;
          case !regExPhone.test($inputPhone.value):
              $phoneError.innerHTML = "Debes ingresar un telefono valido"
              $phoneError.classList.remove("opcional")
              $phoneError.classList.add("error")
              break;  
           default:
              $phoneError.innerHTML = ""
              break;
      }
    })
  
    $inputStreet.addEventListener("blur", () => {
        switch (true) {
            case !$inputStreet.value.trim():
                $streetError.innerHTML = "Ingresá tu dirección para completar tu perfil"
                $streetError.classList.remove("error")
                break;
            case !regExStreet.test($inputStreet.value):
                $streetError.innerHTML = "Debes ingresar un nombre valido"
                $streetError.classList.remove("opcional")
                $streetError.classList.add("error")
                break;
            default:
                $streetError.innerHTML = ""
                break;
        }
    })
  
    $inputCity.addEventListener("blur", () => {
        switch (true) {
            case !$inputCity.value.trim():
                $cityError.innerHTML = "Ingresá tu ciudad para completar tu perfil"
                $cityError.classList.remove("error")
                break;
            case !regExCity.test($inputCity.value):
                $cityError.innerHTML = "Debes ingresar un nombre valido"
                $cityError.classList.remove("opcional")
                $cityError.classList.add("error")
                break;
            default:
                $cityError.innerHTML = ""
                break;
        }
    })
  
    $inputProvince.addEventListener("blur", () => {
        switch (true) {
            case !$inputProvince.value.trim():
                $provinceError.innerHTML = "Ingresá tu ciudad para completar tu perfil"
                $provinceError.classList.remove("error")
                break;
            case !regExCity.test($inputProvince.value):
                $provinceError.innerHTML = "Debes ingresar un nombre valido"
                $provinceError.classList.remove("opcional")
                $provinceError.classList.add("error")
                break;
            default:
                $provinceError.innerHTML = ""
                break;
        }
    })
  
    $form.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        let elementosForm = this.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if($inputName.value == "" && $inputPhone.value == "" 
               && $inputStreet.value == "" && $inputCity.value == "" && $inputProvince == ""){
                  $nameError.classList.add('error');
                  $phoneError.classList.add('error');
                  $streetError.classList.add('error');
                  $cityError.classList.add('error');
                  $provinceError.classList.add('error');
                  
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