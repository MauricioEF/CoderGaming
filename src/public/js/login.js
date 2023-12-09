const form = document.getElementById('loginForm');

form.addEventListener('submit',async event=>{
    event.preventDefault();
    const data = new FormData(form);
    const obj = {}
    data.forEach((value,key)=>obj[key]=value);
    try{
        let valid = false;
        //Primero hay que pedir permiso para poder loguearse
        const response = await fetch('/api/sessions/attempt',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const result = await response.json();
        valid = result.payload.valid;
        console.log(valid);
        if(valid){
            const response = await fetch('/api/sessions/login',{
                method:'POST',
                body:JSON.stringify(obj),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const result = await response.json();
            console.log(result);
        }else{
            console.log("Intentos bloqueados, favor de intentar después")
        }
    }catch(error){

    }
})

async function restorePassword(){
    Swal.fire({
        text:'Ingresa tu correo electrónico, te enviaremos un mail de restauración',
        input:'text',
        inputValidator: value =>{
            return !value && "Es necesario un correo para poder enviar el link de restauración"
        }
    }).then(async result=>{
        try{
            if(result.value){
                const email = result.value;
                const response = await fetch('/api/sessions/passwordRestoreRequest',{
                    method:'POST',
                    body: JSON.stringify({email}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                Swal.fire({
                    status:"success",
                    text:"Si el usuario está en nuestra base, se enviará un correo electrónico con el link de restablecimiento"
                })
            }
        }catch(error){
            console.log(error);
        }
    })
}
