let password = document.getElementById('pass');
let password2 = document.getElementById('pass2');
let viewPassword = document.getElementById('viewPassword');
let click = false;

viewPassword.addEventListener('click', (e)=>{
  if(!click){
    password.type = 'text'
    password2.type = 'text'
    viewPassword.innerHTML = 'Ocultar contraseña'
    click = true
  }else if(click){
    password.type = 'password'
    password2.type = 'password'
    viewPassword.innerHTML = 'Mostrar contraseña'
    click = false
  }
})