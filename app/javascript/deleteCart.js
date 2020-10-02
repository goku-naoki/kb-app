document.addEventListener("turbolinks:load",()=>{
  let deleteCartBtns=Array.from(document.getElementsByClassName("cart-box-left-list-detail-right-delete"));
  const loader=document.getElementById('overlay')
  const cartBox=document.getElementById('cart-box')
  
    const noItem=`
      <div class="cart-box-nothing">
      <p class="cart-box-nothing-desc">No Item</p>
      <p>↓↓↓</p>
      <p class="cart-box-nothing-link" ><a href="/items">Go to shop</a></p>
      </div>
    `
  
    deleteCartBtns.forEach((deleteBtn)=>{
      deleteBtn.addEventListener('click',(event)=>{
        loader.classList.add('fadein-bg')
        const XHR =new XMLHttpRequest();
        const token = document.getElementsByName('csrf-token')[0].content;
        const item_id=Number(event.target.getAttribute('data-delete-id'))
        console.log(token)
          const fd = new FormData();
          fd.append('item_id',item_id);
          fd.append('_method','DELETE');     //postでもこの記述でdeleteになる！！！！
          XHR.open("POST", `/carts/delete_item`, true);
          XHR.setRequestHeader('X-CSRF-Token', token); 
          XHR.responseType = "json";
          XHR.send(fd);
          XHR.onload = () => {
          console.log(XHR.status)
            if(XHR.status == 200){
              setTimeout(()=>{
                loader.classList.remove('fadein-bg')
                event.target.parentNode.parentNode.remove();
                deleteCartBtns=Array.from(document.getElementsByClassName("cart-box-left-list-detail-right-delete"));
                console.log(deleteCartBtns)
                if(deleteCartBtns.length==0){
                  document.getElementById('cart-confirm').remove()
                  cartBox.insertAdjacentHTML('beforeend', noItem);
      
                }
              },1000)
             
          
            }else{
              alert('失敗')
            }
          }
      })
    })

 
})