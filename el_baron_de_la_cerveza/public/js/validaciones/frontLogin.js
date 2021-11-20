function qs(element) {
    return document.querySelector(element)
}

window.addEventListener("load", function() {
    let $inputEmail = qs("#email"),
    $emailErrors = qs("#emailErrors"),
    $pass = qs("#pass"),
    $passErrors = qs("#passErrors"),
    $form = qs("#form"),
    submitErrors = qs("#submitErrors"),


    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    $inputEmail.addEventListener("blur", function() {
        switch (true) {
            case !$inputEmail.value.trim():
                $emailErrors.innerHTML = "Ingrese un Email";
                $inputEmail.style.border = "2px solid red";
                break;
            case !regExEmail.test($inputEmail.value):
                $emailErrors.innerHTML = "El Email ingresado no es valido";
                $inputEmail.style.border = "2px solid red";
                break
            default:
                $emailErrors.innerHTML = ""
                break;
        }
    });

    $pass.addEventListener("blur", function() {
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = "Ingrese una Contraseña";
                $pass.style.border = "2px solid red";
                break;
            default:
                $passErrors.innerHTML = ""
                break;
        }
    })
    $form.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        console.log($form.elements)
        let elementosForm = this.elements
        
        for (let index = 0; index < elementosForm.length-1; index++) {
            if($inputEmail.value == "" && $pass.value == ""){
                $inputEmail.style.border = "2px solid red";
                $pass.style.border = "2px solid red";
                  
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