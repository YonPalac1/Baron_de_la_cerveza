let password = document.getElementById('pass');
let viewPassword = document.getElementById('viewPassword');
let click = false;

viewPassword.addEventListener('click', (e)=>{
  if(!click){
    password.type = 'text'
    viewPassword.innerHTML = 'Ocultar contraseña'
    click = true
  }else if(click){
    password.type = 'password'
    viewPassword.innerHTML = 'Mostrar contraseña'
    click = false
  }
})