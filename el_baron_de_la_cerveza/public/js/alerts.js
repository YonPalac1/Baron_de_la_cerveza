// document.getElementById("btnSubmit").onclick = submitAction;

const $formDelete = document.querySelectorAll("#formDelete")
const btnOpenSession = document.querySelectorAll("#btnOpenSession")

for (var i = 0 ; i < $formDelete.length; i++) {
    $formDelete[i].addEventListener('submit',function(event){
        event.preventDefault()
        let error = false;


        Swal.fire({
            title: 'Seguro que quieres eliminar?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Eliminado exitosamente', '')
            } else {
              error = true
            }
         
            if(!error){
              console.log('Todo bien');
              this.submit()
              return false
          }
          })
    })
  }
  
  for (var i = 0 ; i < btnOpenSession.length; i++) {
    btnOpenSession[i].addEventListener("click", function(){
      Swal.fire({
        icon: 'info',
        html:
          'Debe, ' +
          '<a href="/users/login">Registrarse</a> ' +
          'para agregar productos al carrito',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<a href="/users/login">Registrarse</a> ',
        cancelButtonText: 'Cancelar'
      })
    })
  }