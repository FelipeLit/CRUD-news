let btnIngresarAdmin = document.getElementById('btnIngresar')
let userInvalid = document.getElementById('userInvalid')

btnIngresarAdmin.setAttribute('data-bs-toggle','modal')
btnIngresarAdmin.setAttribute('data-bs-target','#login')

btnIngresarAdmin.addEventListener('click', ()=>{
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    console.log(email);
    fetch ('http://localhost:3000/users')
    .then ((r)=>r.json())
    .then ((data)=>{
        datos = data.filter(function(datosUsuario){
            return (datosUsuario.email == email.value && datosUsuario.password == password.value)
        })
        if (datos.length > 0){
            localStorage.setItem('email', `${datos[0].email}`)
            localStorage.setItem('id', `${datos[0].id}`)
            location.href = 'administrator.html'
        }
        else{
            userInvalid.innerText = `Usuario y/o contraseña incorrectos`
        }
    })
})
