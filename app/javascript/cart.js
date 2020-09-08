// if (document.URL.match( /items/ )) {
document.addEventListener("turbolinks:load",()=>{
  const cartBtn=document.getElementById('cart-btn')
  const item_id=Number(cartBtn.getAttribute("data-item-id"))

    cartBtn.addEventListener('click',()=>{
      console.log('hoge')
      const XHR =new XMLHttpRequest();
        const token = document.getElementsByName('csrf-token')[0].content;
        console.log(token)
        const fd = new FormData();
        fd.append('item_id',item_id);
        fd.append('quantity', 4);
       
  
        XHR.open("POST", `/add_item`, true);
        XHR.setRequestHeader('X-CSRF-Token', token);   //koko!!!  application.contorollerで許可するとsessionだめ

        XHR.responseType = "json";
        XHR.send(fd);
        XHR.onload = () => {
        console.log(XHR.status)
          if(XHR.status == 200){
          console.log('hoge')
          cartBtn.textContent='カートに入っています'
          cartBtn.removeAttribute('id')
          cartBtn.setAttribute("style", "background:#c8c8c8;; opacity: .6;");
          }else{
            alert('失敗')
          }


        }
    })
 
})

// }