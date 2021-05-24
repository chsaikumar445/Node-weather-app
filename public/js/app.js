const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value

  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
  response.json().then((data)=>{
    
      if(data.error){
        messageone.textContent = data.error
        messagetwo.textContent = ""
      }
      else{
       messageone.textContent = data.place
       messagetwo.textContent = data.forecast
      }
      
    
  })
})

})