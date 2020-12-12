
document.addEventListener("turbolinks:load",()=>{
  if(window.location.pathname.match(/\/guest/)){
    const form=document.getElementById("new_admin")
    setTimeout(()=>{
      form.submit()
    },0)
  }
 

 
})