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
        regExPhone = /^\d{7,14}$/,
        regExStreet = /[A-Za-z0-9'\.\-\s\,]/,
        regExCity = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    
    $inputName.addEventListener("blur", () => {
      switch (true) {
        case !$inputName.value.trim():
          $nameError.innerHTML = "El campo nombre es obligatorio";
          break;
        case !regExAlpha.test($inputName.value):
          $nameError.innerHTML = "Debes ingresar un nombre válido"
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
  
    /* $form.addEventListener("submit", (e) => {
      let error = false
      e.preventDefault();
      let elementForm = this.elements
  
      for (let index = 0; index < elementForm.length-1; index++) {
        if(!regExAlpha.test($inputName.value) && !$inputName.value.trim()){
  
        }
        
      }
    }) */
  })