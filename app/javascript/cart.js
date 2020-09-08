document.addEventListener('DOMContentLoaded',()=>{
  const cartBtn=document.getElementById('cart-btn')

    cartBtn.addEventListener('click',()=>{
      console.log('hoge')
      const XHR =new XMLHttpRequest();

        const fd = new FormData();
        fd.append('item_id', '1');
        fd.append('quantity', '1');
  
        XHR.open("POST", `/add_item`, true);
        XHR.responseType = "json";
        XHR.send(fd);
        XHR.onload = () => {
   
          if(XHR.status == 200){
          const item = XHR.response.like; 
          
          }else{
            alert('失敗')
          }


       }
    })
 
})