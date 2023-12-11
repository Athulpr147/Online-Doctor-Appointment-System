





async function login_validtion (){
    try {
        const loginSubmit = document.getElementById('loginSubmit')
loginSubmit.addEventListener('click',()=>{
  
    const loginEmail = document.getElementById('loginEmail').value
    const loginPassword = document.getElementById('loginPassword').value
    const message = document.getElementById('login_err')
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    message.innerHTML = ''
    if(loginEmail.length === 0 || loginEmail === '' ){
        message.innerHTML = 'Enter email'
        return
    }
    if(!emailRegex.test(loginEmail)){
        message.innerHTML = 'Invalid email'
        return
    }
    if(loginPassword.length === 0 || loginPassword === ''){
        message.innerHTML = 'Enter a password'
        return
    }
    if(loginPassword.length < 4 ){
        message.innerHTML = 'Password must be minimun 4 charcter'
    }

    fetch('/login',{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({
            email : loginEmail,
            password : loginPassword
        })
    })
    .then(response => response.json())
    .then(data =>{
        if(data.sucess){
            message.innerHTML = 'Login sucess'
            loginSubmit.disabled = true
            window.location.href = '/'
        }
        else{
            message.innerHTML = data.message
        }
    })

})
    } catch (error) {
        console.log(error)
    }
}


async function register_account(){
    try {
        const regSubmit = document.getElementById('regSubmit')
regSubmit.addEventListener('click',()=>{
   
    const Email = document.getElementById('regEmail').value
    const Password = document.getElementById('regPassword').value
    const Password2 = document.getElementById('regPassword2').value
    const message = document.getElementById('reg_err')
    const Name = document.getElementById('regName').value
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    message.innerHTML = ''
    if(Name.length === 0 || Name === '' ){
        message.innerHTML = 'Enter name'
        return
    }
    if(Email.length === 0 || Email === '' ){
        message.innerHTML = 'Enter email'
        return
    }
    if(!emailRegex.test(Email)){
        message.innerHTML = 'Invalid email'
        return
    }
    if(Password.length === 0 || Password === ''){
        message.innerHTML = 'Enter a password'
        return
    }
    if(Password.length < 4 ){
        message.innerHTML = 'Password must be minimun 4 charcter'
    }
    if(Password2.length === 0 || Password2 === ''){
        message.innerHTML = 'Enter second password'
        return
    }
    if(Password2.length < 4 ){
        message.innerHTML = 'Password must be minimun 4 charcter'
    }
    if(Password !== Password2){
        message.innerHTML = 'Password is not equal'
        return
    }
    console.log('data sended')
     fetch('/signup',{
        method:'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({
            name : Name, 
            email : Email, 
            password : Password
        })
     })
      .then(response => response.json())
      .then(data=>{
        console.log('data recived')
        if(data.sucess){
            message.innerHTML = 'Account created sucess'
            regSubmit.disabled = true
            window.location.href = '/'
        }else{
            message.innerHTML = data.message
        }
      })
      .catch(error =>{
        console.log('data not recived some error =>')
        console.log(err)
        message.innerHTML = 'Server error'
      })




})
    } catch (error) {
        
    }
}
login_validtion()
register_account()