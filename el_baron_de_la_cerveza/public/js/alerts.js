// document.getElementById("btnSubmit").onclick = submitAction;

const $formDelete = document.querySelectorAll("#formDelete")

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
  