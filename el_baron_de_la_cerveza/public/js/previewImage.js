function qs(element) {
    return document.querySelector(element);
  }
  
          
  window.addEventListener("load", function () {
  
  $file = qs("#formFile"),
  $fileErrors = qs("#fileErrors"),
  $imgPreview = qs("#img-preview"),
          
  $file.addEventListener('change', 
      function fileValidation(){
          let filePath = $file.value, //Capturo el valor del input
              allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
          if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
              $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
              $file.value = '';
              $imgPreview.innerHTML = '';
              return false;
          }else{
              // Image preview
              console.log($file.files);
              if($file.files && $file.files[0]){
                  let reader = new FileReader();
                  reader.onload = function(e){
                      $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                  };
                  reader.readAsDataURL($file.files[0]);
                  $fileErrors.innerHTML = '';
                  $file.classList.remove('is-invalid')
              }
          }
      })
  })