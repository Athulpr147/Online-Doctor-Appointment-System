let isUserIsLogin = false
const continue_appointment = document.getElementById('continue_appointment')
const message = document.getElementById('continue_err')
let userName 
let sendingEmail
let appointmentType = 'On Clinic'
let date = getTodayDate()
let timeSlot

fetch('/checkUser')
.then(response => response.json())
.then(data =>{
    console.log('data recived')
    const loginedShow = document.getElementById('ifLoginedShow')
    const NotloginedShow = document.getElementById('ifNotLoginedShow')
    if(data.logined){
        continue_appointment.disabled = false
        isUserIsLogin = true
        loginedShow.style.display = 'block'
        NotloginedShow.style.display = 'none'
        message.innerHTML = ''
        document.getElementById('profileName').innerHTML = 'Hi, '+data.userName
        userName = data.userName
    }else{
        isUserIsLogin = false
        loginedShow.style.display = 'none'
        NotloginedShow.style.display = 'block'
       
       
    }
})


const onClinic = document.getElementById('select-inClinic')
const audio = document.getElementById('select-audio')
const video = document.getElementById('select-video')
const onlinePaymsg = document.getElementById('onlinepayornot')
onlinePaymsg.innerHTML=''
onClinic.addEventListener('click',()=>{
    onClinic.classList.add('select-active')
    audio.classList.remove('select-active')
    video.classList.remove('select-active')
    appointmentType = 'On Clinic'
    onlinePaymsg.innerHTML=''
})
audio.addEventListener('click',()=>{
    onClinic.classList.remove('select-active')
    audio.classList.add('select-active')
    video.classList.remove('select-active')
    appointmentType = 'Audio'
    onlinePaymsg.innerHTML=' (Pay Online)'
})
video.addEventListener('click',()=>{
    onClinic.classList.remove('select-active')
    audio.classList.remove('select-active')
    video.classList.add('select-active')
    appointmentType = 'Video'
    onlinePaymsg.innerHTML=' (Pay Online)'
})

function getTodayDate() {
   
    const today = new Date();

  
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    return formattedDate;
}
function getTomorrowDate() {

    var today = new Date();
    var tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);
    var year = tomorrow.getFullYear();
    var month = tomorrow.getMonth() + 1;
    
    var day = tomorrow.getDate();
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    return formattedDate;
}



const dateToday = document.getElementById('dateToday')
const dateTomorrow = document.getElementById('dateTomorrow')
const dateSelect = document.getElementById('dateSelect')

dateToday.addEventListener('click',()=>{
    date = getTodayDate()
    dateToday.classList.add('date-active')
    dateTomorrow.classList.remove('date-active')
    dateSelect.classList.remove('date-active')
    
})
dateTomorrow.addEventListener('click',()=>{
    date = getTomorrowDate()
    dateToday.classList.remove('date-active')
    dateTomorrow.classList.add('date-active')
    dateSelect.classList.remove('date-active')
})

function getSelectedDate(){
    const selectDate = document.getElementById('selectDate').value
    dateToday.classList.remove('date-active')
    dateTomorrow.classList.remove('date-active')
    dateSelect.classList.add('date-active')
    document.getElementById('sellabel').innerHTML = selectDate
    date = selectDate
}

const times = {
    a : '10:00AM',
    b : '11:00AM',
    c : '12:00AM',
    d : '01:00PM',
    e : '02:00PM',
    f : '03:00PM',
  
}

const time10 = document.getElementById('a')
const time11 = document.getElementById('b')
const time12 = document.getElementById('c')
const time01 = document.getElementById('d')
const time02 = document.getElementById('e')
const time03 = document.getElementById('f')

time10.addEventListener('click',()=>{
    time10.classList.add('timeActive')
    time11.classList.remove('timeActive')
    time12.classList.remove('timeActive')
    time01.classList.remove('timeActive')
    time02.classList.remove('timeActive')
    time03.classList.remove('timeActive')
    timeSlot = times.a
    
})
time11.addEventListener('click',()=>{
    time10.classList.remove('timeActive')
    time11.classList.add('timeActive')
    time12.classList.remove('timeActive')
    time01.classList.remove('timeActive')
    time02.classList.remove('timeActive')
    time03.classList.remove('timeActive')
    timeSlot = times.b
    
})
time12.addEventListener('click',()=>{
    time10.classList.remove('timeActive')
    time11.classList.remove('timeActive')
    time12.classList.add('timeActive')
    time01.classList.remove('timeActive')
    time02.classList.remove('timeActive')
    time03.classList.remove('timeActive')
    timeSlot = times.c
     
})
time01.addEventListener('click',()=>{
    time10.classList.remove('timeActive')
    time11.classList.remove('timeActive')
    time12.classList.remove('timeActive')
    time01.classList.add('timeActive')
    time02.classList.remove('timeActive')
    time03.classList.remove('timeActive')
    timeSlot = times.d
     
})
time02.addEventListener('click',()=>{
    time10.classList.remove('timeActive')
    time11.classList.remove('timeActive')
    time12.classList.remove('timeActive')
    time01.classList.remove('timeActive')
    time02.classList.add('timeActive')
    time03.classList.remove('timeActive')
    timeSlot = times.e
     
})
time03.addEventListener('click',()=>{
    time10.classList.remove('timeActive')
    time11.classList.remove('timeActive')
    time12.classList.remove('timeActive')
    time01.classList.remove('timeActive')
    time02.classList.remove('timeActive')
    time03.classList.add('timeActive')
    timeSlot = times.f
     
})


// const continue_appointment = document.getElementById('continue_appointment')
continue_appointment.addEventListener('click',()=>{
    document.getElementById('showTime').innerHTML = timeSlot
     document.getElementById('showDate').innerHTML = date
     document.getElementById('appoType').innerHTML = appointmentType

    // const message = document.getElementById('continue_err')
    const booking_page = document.getElementById('booking_page')
    const continue_page = document.getElementById('continue_page')
    message.innerHTML = ''
    if(!isUserIsLogin){
        message.innerHTML = 'Please Login to continue '
        return
    }
    if(!timeSlot){
        message.innerHTML = 'Please select a time '
        return
    }
    booking_page.style.display = 'none'
    continue_page.style.display = 'block'
})


const sent_otp = document.getElementById('sent_otp')
sent_otp.addEventListener('click',()=>{
    const email = document.getElementById('email').value
    const message = document.getElementById('email_err')
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    message.innerHTML = ''
    if(email.length === 0 ){
        message.innerHTML = 'Enter email'
        return
    }
    if (!emailRegex.test(email)){
        message.innerHTML = 'Invalid Email'
        return
    }
    sendingEmail = email
    document.getElementById('sending').innerHTML = 'Sending otp...'
    setTimeout(()=>{
        document.getElementById('sending').innerHTML = 'Slow network...' 
    },5000)
    fetch('/sendOtp',{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({
            email : email ,
            name : userName
        })
    })
    .then(response => response.json())
    .then(data =>{
        if(data.sucess){
            document.getElementById('sending').innerHTML = '' 
            document.getElementById('emailInput').style.display = "none"
            document.getElementById('otpInput').style.display = 'block'
        }else{
            message.innerHTML = 'OTP not sended'
            console.log(message)
        }
    }).catch(err =>{
        console.log(err)
    })
})


const submitOTP = document.getElementById('submitOTP')
submitOTP.addEventListener('click',()=>{
    const otpInput = document.getElementById('otp').value
    const message = document.getElementById('otp_ERR')
    if(otpInput.length === 0 || otpInput === ''){
        message.innerHTML = 'Enter otp'
        return
    }
    if(otpInput.length < 4){
        message.innerHTML = 'Invalid OTP'
        return
    }
    fetch('/checkOTP',{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({
            email : sendingEmail,
            otp : otpInput
        })
    })
    .then(response => response.json())
    .then(data =>{
        if(data.sucess){
            document.getElementById('sending').innerHTML = ''
            console.log('sucess')
            submitOTP.disabled = true
            submitOTP.style.color = 'grey'
            //After verifying email save appointment
            fetch('/addAppointment',{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                name : userName,
                email : sendingEmail,
                appointmentType,
                date,
                timeSlot
            })
            }).then(response => response.json())
            .then(data =>{
                if(data.sucess){
                    alert(`Appointment booked on ${data.date} at ${data.timeSlot}`)
                    
                    window.location.href = '/'
                }
            }).catch(err =>{
                console.log(err)
                alert('Appointment booking failed')
                    window.location.href = '/'
            })

        }else{
            message.innerHTML = data.message
        }
    })
    .catch(err =>{
        console.log(err)
        document.getElementById('sending').innerHTML = 'Something went wrong' 
        setTimeout(()=>{
            window.location.href = '/'
        },3000) 
    })
})



// appointmentType
// date
//time slot

// let userName 
// let sendingEmail
// let appointmentType = 'On Clinic'
// let date = getTodayDate()
// let timeSlot
