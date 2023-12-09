const form = document.getElementById('videogameForm');


form.addEventListener('submit',async event=>{
    event.preventDefault();
    const data = new FormData(form);
    const response = await fetch('/api/videogames',{
        method:'POST',
        body:data
    });
    const result = await response.json();
    console.log(result);
})