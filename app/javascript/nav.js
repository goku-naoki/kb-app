window.addEventListener("turbolinks:load",()=>{
 const navs=Array.from(document.getElementsByClassName('nav'))
 const spNav=document.getElementById('sp-nav')
  console.log(navs)

  navs.forEach((nav)=>{
    console.log(nav)
    nav.addEventListener('click',()=>{
      console.log(nav)
      spNav.classList.toggle('toggle')
    })
  })
 
})